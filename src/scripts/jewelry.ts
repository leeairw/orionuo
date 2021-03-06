namespace Scripts {

    /**
     * Obsahuje zakladni scripty
     */
    export class Jewelry {

        /**
         * Pouzije Reflex Ring nebo Great Reflex Ring
         */
        static useRR() {
            const rr = <IMyGameObject>gameObject.rings.rr;
            const grr = <IMyGameObject>gameObject.rings.grr;
            const grr2 = <IMyGameObject>gameObject.rings.grr2;
            let rrSerials = Orion.FindType(rr.graphic, rr.color);
            let grrSerials = Orion.FindType(grr.graphic, grr.color);
            let grr2Serials = Orion.FindType(grr2.graphic, grr2.color);
            let rings = [...rrSerials, ...grrSerials, ...grr2Serials];

            if (!rings.length) {
                Scripts.Utils.playerPrint(`Nemas Reflex ringy`, ColorEnum.red);
                return;
            }

            Orion.ClearJournal();
            for (const ring of rings) {
                const ringObject = Orion.FindObject(ring);
                const x = ringObject.X();
                const y = ringObject.Y();
                Orion.UseObject(ring);
                if (Orion.InJournal("It too soon to use it again")) {
                    Orion.MoveItem(ring, 0, 'backpack', x, y);
                    break;
                }
            }
        }

        /**
         * Pouzije Great Gold Ring
         */
        static useGGR() {
            const ggrObj = gameObject.rings.ggr;
            const ggrSerials = Orion.FindType(ggrObj.graphic, ggrObj.color);
            if (!ggrSerials.length) {
                Scripts.Utils.playerPrint(`Nemas Great Gold ringy`, ColorEnum.red);
                return;
            }

            const ggrSerial = ggrSerials[0];
            Orion.UseObject(ggrSerial);
            Orion.Wait(50);
            Orion.MoveItem(ggrSerial, 0, 'backpack', ggrObj.bag.x, ggrObj.bag.y);
        }
    }
}
