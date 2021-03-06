namespace Scripts {

    /**
     * Stability EXPERIMENTAL
     *
     * je potreba si poupravit nejaka IDcka jako treba robe of druids atd,
     * hlavni ucel byl pro pousteni scriptu trainOnAnimalsAround
     * ktery se ale obcas zasekne
     * Je to potreba jeste poupravit a dodelat.. (portovani pres runy atd)
     */
    export class Taming {
        /**
         * Scripts.Taming.useTrainingTamingStaff
         * returns false when you dont have staff or shrinks
         */
        static useTrainingTamingStaff(targetSerial:string):boolean {
            let staff = Scripts.Utils.findFirstType(gameObject.taming.staffs.training, 2);
            if (!staff) {
                Scripts.Utils.log('missing training taming staff', ColorEnum.red);
                return false;
            }

            Orion.WaitTargetObject(targetSerial);
            Orion.UseObject(staff);
            while (!Orion.InJournal('What do you want to use this on')) {
                Orion.Wait(500);
                Orion.WaitTargetObject(targetSerial);
                Orion.UseObject(staff);
            }
            return true;
        }

        static waitOnTaming(animalSerial:string) {
            const animal = Orion.FindObject(animalSerial);
            while (!(
                Orion.InJournal('Your taming failed') ||
                Orion.InJournal('Ochoceni se nezdarilo') ||
                Orion.InJournal('Too far') ||
                Orion.InJournal('Not tamable') ||
                Orion.InJournal('byl tamnut') ||
                Orion.InJournal('Cannot learn anything more') ||
                Orion.InJournal('You are not able to tame this animal')
            )) {
                Orion.Wait(500);
                Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 1);
            }
        }

        // false in case there is no such robe, undefined when it is already dressed
        static dressRobeOfDruids():boolean|undefined {
            const robeOfDruids =  Orion.FindObject('0x4034E76C');

            if (!robeOfDruids) {
                return false;
            }

            Orion.UseObject(robeOfDruids.Serial());

            return !!Orion.InJournal('You feel more powerful');
        }

        static undressRobe() {
            Orion.Unequip ('Robe');
            Orion.Wait(1000);
        }

        static trainOnAnimal(animalSerial:string, ranger = true):boolean|undefined {
            Scripts.Utils.log('train on animal serial ' + animalSerial);
            let animal = Orion.FindObject(animalSerial);
            Orion.SetGlobal('tamingCounter', (parseInt(Orion.GetGlobal('tamingCounter'), 10) + 1).toString(10))

            if (parseInt(Orion.GetGlobal('tamingCounter'), 10) > 33) {
                ranger && Scripts.Taming.dressRobeOfDruids();
            }

            Orion.ClearJournal();

            if (!Scripts.Taming.useTrainingTamingStaff(animalSerial)) {
                return;
            }

            Scripts.Taming.waitOnTaming(animalSerial);

            if (
                Orion.InJournal('You are not able to tame this animal') ||
                Orion.InJournal('Cannot learn anything more') ||
                Orion.InJournal('Not tamable')
            ) {
                if (ranger && Scripts.Taming.dressRobeOfDruids()) {
                    Scripts.Taming.trainOnAnimal(animalSerial, ranger);
                    return;
                }
                ranger && Scripts.Taming.undressRobe();
                Scripts.Utils.log('kill animal serial ' + animalSerial);
                Orion.Equip('fightWeapon');
                Scripts.Auto.killObject(animalSerial);
                return;
            }

            if (
                Orion.InJournal('Your taming failed') ||
                Orion.InJournal('Ochoceni se nezdarilo')
            ) {
                Scripts.Taming.trainOnAnimal(animalSerial, ranger);
                return;
            }

            if (Orion.InJournal('Too far')) {
                Orion.Wait(500);
                Orion.WalkTo(animal.X(), animal.Y(), animal.Z(), 1);
                Orion.Wait(2000);
                Scripts.Taming.trainOnAnimal(animalSerial, ranger);
                return;
            }

            if (Orion.InJournal('byl tamnut')) {
                ranger && Scripts.Taming.undressRobe();
                return true;
            }
        }

        static trainOnAnimalsAround(ranger = true) {
            if (!Orion.FindObject('fightWeapon')) {
                Scripts.Utils.playerPrint('Target your weapon');
                Orion.WaitForAddObject('fightWeapon', 60000);
            }
            Orion.IgnoreReset();
            Orion.ClearJournal();
            ranger && Scripts.Taming.undressRobe();
            let monstersAround = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "nothuman|live|near", 22, "gray");

            while (monstersAround.length) {
                Orion.Ignore(monstersAround[0]);
                Orion.SetGlobal('tamingCounter', '0');
                Scripts.Taming.trainOnAnimal(monstersAround[0], ranger);
                monstersAround = Orion.FindType("!0x0190|!0x0191", "-1", "ground", "nothuman|live|near", 22, "gray");
            }
        }

        static useShrinkKad() {
            const kad = gameObject.potions.shrink.kad;
            Orion.UseType(kad.graphic, kad.color);
        }

        static taming() {
            const loadedStaff = gameObject.taming.staffs.tamingShrink;
            let loadedStaffSerial = Scripts.Utils.findFirstType(loadedStaff, 2);
            const staff = gameObject.taming.staffs.taming;
            const staffSerial = Scripts.Utils.findFirstType(staff, 2);

            if (!loadedStaffSerial && staffSerial) {
                const shrink = gameObject.potions.shrink;
                const shrinkSerials = Orion.FindType(shrink.graphic, shrink.color);
                const shrinkKadSerials = Orion.FindType(shrink.kad.graphic, shrink.kad.color);
                if (shrinkSerials.length) {
                    Orion.WaitTargetObject(shrinkSerials[0]);
                }
                else if (shrinkKadSerials.length) {
                    Orion.WaitTargetObject(shrinkKadSerials[0]);
                }
                Orion.UseObject(staffSerial);
                Scripts.Utils.waitWhileSomethingInJournal(['Hul nabita']);
                Orion.Wait(responseDelay);
            }

            loadedStaffSerial = Scripts.Utils.findFirstType(loadedStaff, 2);
            if (!loadedStaffSerial) {
                Scripts.Utils.playerPrint('Nemas potrebne vybaveni na taming', ColorEnum.red);
                return;
            }

            Orion.ClearJournal();

            Scripts.Utils.playerPrint('Co chces tamnout ?');
            const selection = Orion.WaitForAddObject('tamingTarget');
            if (selection !== 1) {
                return;
            }

            let tamnuto = false;
            while (!tamnuto) {
                const target = Orion.FindObject('tamingTarget');

                Orion.WaitTargetObject('tamingTarget');
                Orion.UseObject(loadedStaffSerial);

                Scripts.Utils.waitWhileSomethingInJournal([
                    'Hul nabita',
                    'Your taming failed',
                    'Ochoceni se nezdarilo',
                    'Too far',
                    'Jsi prilis vzdalen',
                    'Jsi moc daleko',
                    'Not tamable',
                    'byl tamnut',
                    'You are not able to tame this animal'
                ]);

                if (Orion.InJournal('Too far|Jsi prilis vzdalen|Jsi moc daleko')) {
                    Orion.WalkTo(target.X(), target.Y(), target.Z(), 1);
                }
                if (Orion.InJournal('Not tamable|You are not able to tame this animal')) {
                    Scripts.Utils.playerPrint('Na toto zviratko nemas', ColorEnum.red);
                    break;
                }
                if (Orion.InJournal('byl tamnut')) {
                    const groundItemsSerials = Orion.FindType('any', 'any', 'ground', 'item', 3);
                    for (const g of groundItemsSerials) {
                        Orion.MoveItem(g);
                    }
                    tamnuto = true;
                }
                Orion.ClearJournal();
            }
        }
    }
}
