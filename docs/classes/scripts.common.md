**[orionuo](../README.md)**

> [Globals](../globals.md) / [Scripts](../modules/scripts.md) / Common

# Class: Common

Obsahuje zakladni scripty

## Hierarchy

* **Common**

## Index

### Methods

* [bandageSelf](scripts.common.md#bandageself)
* [hideAll](scripts.common.md#hideall)
* [hiding](scripts.common.md#hiding)
* [lavaBomb](scripts.common.md#lavabomb)
* [mysticCounter](scripts.common.md#mysticcounter)
* [poisonTrain](scripts.common.md#poisontrain)
* [shrinkKad](scripts.common.md#shrinkkad)
* [svetlo](scripts.common.md#svetlo)
* [trackingPvp](scripts.common.md#trackingpvp)
* [webDestroyer](scripts.common.md#webdestroyer)

## Methods

### bandageSelf

▸ `Static`**bandageSelf**(`minimalCountToWarn`: number, `pathToNoBandagesWavFile`: string): void

*Defined in [scripts/common.ts:79](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L79)*

Scripts.Common.bandageSelf
stability beta

hodi si bandu, pripadne vypise ze nema a prehraje wav soubor

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`minimalCountToWarn` | number | 10 |
`pathToNoBandagesWavFile` | string | "C:/critical.wav" |

**Returns:** void

___

### hideAll

▸ `Static`**hideAll**(): void

*Defined in [scripts/common.ts:129](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L129)*

**Returns:** void

___

### hiding

▸ `Static`**hiding**(): void

*Defined in [scripts/common.ts:51](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L51)*

Scripts.Common.hiding
stability beta

hidne, pripadne prepne war a hidne

**Returns:** void

___

### lavaBomb

▸ `Static`**lavaBomb**(): void

*Defined in [scripts/common.ts:152](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L152)*

**Returns:** void

___

### mysticCounter

▸ `Static`**mysticCounter**(): void

*Defined in [scripts/common.ts:101](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L101)*

**Returns:** void

___

### poisonTrain

▸ `Static`**poisonTrain**(`keepRunning`: boolean): void

*Defined in [scripts/common.ts:199](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L199)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`keepRunning` | boolean | false |

**Returns:** void

___

### shrinkKad

▸ `Static`**shrinkKad**(): void

*Defined in [scripts/common.ts:34](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L34)*

Scripts.Common.shrinkKad
stability beta

Pouzije shrink kad

**Returns:** void

___

### svetlo

▸ `Static`**svetlo**(`shouldCast`: boolean): void

*Defined in [scripts/common.ts:16](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L16)*

Scripts.Common.svetlo
stability released

Pouzije svetlo z kade na sebe
Pokud nenajde kad, tak zakouzli svetlo.
Kouzleni lze zakazat pomoci parametru Scripts.Common.svetlo(false)

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`shouldCast` | boolean | true |

**Returns:** void

___

### trackingPvp

▸ `Static`**trackingPvp**(): void

*Defined in [scripts/common.ts:164](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L164)*

**Returns:** void

___

### webDestroyer

▸ `Static`**webDestroyer**(): void

*Defined in [scripts/common.ts:190](https://github.com/msviha/orionuo/blob/2ad0399/src/scripts/common.ts#L190)*

**Returns:** void
