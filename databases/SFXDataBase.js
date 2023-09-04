export const database = {
    system: {
        roll: {
            failure: ["modules/johns-cypher-addons/library/SFX/system/roll/failure.ogg"],
            criticalSuccess: ["modules/johns-cypher-addons/library/SFX/system/roll/criticalSuccess.ogg"],
            criticalFailure: {}
        },
        combat: {
            turn: {
                ally: {},
                enemy: {}
            },
            immunity: {},
            weakness: {},
            victory: {},
            condition: {
                debuff: ["modules/johns-cypher-addons/library/SFX/condition/debuff.ogg"],
                hazard: ["modules/johns-cypher-addons/library/SFX/condition/hazard.ogg"],
                sleep: ["modules/johns-cypher-addons/library/SFX/condition/sleep.ogg"],
                dizzy: ["modules/johns-cypher-addons/library/SFX/condition/dizzy.ogg"],
                confused: ["modules/johns-cypher-addons/library/SFX/condition/confused.ogg"],
                frozen: ["modules/johns-cypher-addons/library/SFX/condition/frozen.ogg"],
                paralyzed: ["modules/johns-cypher-addons/library/SFX/condition/paralyzed.ogg"]
            }
        },
        exploration: {
            discovery: {},
            puzzle: {
                introduction: {},
                overcome: {}
            }
        }
    },
    voice: {
        pc: {},
        npc: {}
    },
    ambient: {
        environment: {},
        trap:{},
        mechanism: {},
        footsteps: {}
    },
    interaction: {
        switch: {},
        door: {},
        container: {}
    },
    items: {
        acid: ["modules/johns-cypher-addons/library/SFX/item/acid/acid_1.ogg"],
        electricity: {
            charge: [
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_1.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_2.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_3.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_4.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_5.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_6.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_7.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/charge/electricity_charge_8.ogg"
            ],
            cast: [
                "modules/johns-cypher-addons/library/SFX/item/electricity/cast/electricity_cast_1.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/cast/electricity_cast_2.ogg",
                "modules/johns-cypher-addons/library/SFX/item/electricity/cast/electricity_cast_3.ogg"
            ]
        },
        flash: ["modules/johns-cypher-addons/library/SFX/item/flash/flash_1.ogg"],
        cloak: ["modules/johns-cypher-addons/library/SFX/item/cloak/cloak_1.ogg"]
    },
    ability: {
        action: {
            spend_calamity: ["modules/johns-cypher-addons/library/SFX/ability/action/spend_calamity/spend_calamity.ogg"],
            charge: ["modules/johns-cypher-addons/library/SFX/ability/action/charge/charge.ogg"],
            broadcast: {
                cast: ["modules/johns-cypher-addons/library/SFX/ability/action/broadcast/broadcast_cast.ogg"],
                break: ["modules/johns-cypher-addons/library/SFX/ability/action/broadcast/broadcast_break.ogg"]
            },
            hedge_magic: ["modules/johns-cypher-addons/library/SFX/ability/action/hedge_magic/hedge_magic.ogg"],
            critical_reaction: {
                cast: ["modules/johns-cypher-addons/library/SFX/ability/action/critical_reaction/critical_reaction_cast.ogg"],
                end: ["modules/johns-cypher-addons/library/SFX/ability/action/critical_reaction/critical_reaction_end.ogg"]
            }
        },
        enabler: {
            absorb_calamity: ["modules/johns-cypher-addons/library/SFX/ability/enabler/absorb_calamity/absorb_calamity.ogg"],
            duplicity: ["modules/johns-cypher-addons/library/SFX/ability/enabler/duplicity/duplicity.ogg"],
            frenzy: ["modules/johns-cypher-addons/library/SFX/ability/enabler/frenzy/frenzy.ogg"],
            decompile: ["modules/johns-cypher-addons/library/SFX/ability/enabler/decompile/decompile.ogg"]
        }
    },
    weapon: {
        melee: {
            slashing: {
                impact: {
                    armor: [
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_5.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/armor/slashing_impact_armor_6.ogg"
                        ],
                    flesh: [
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_5.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/impacts/flesh/slashing_impact_flesh_6.ogg"
                        ],
                },
                swings: {
                    light: {},
                    medium: {
                        sword: [
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_1.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_2.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_3.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_4.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_5.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_6.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_7.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/slashing/swings/medium/sword/slashing_swing_medium_sword_8.ogg"
                                ]
                    },
                    heavy: {}
                }
            },
            piercing: {
                impact: {
                    armor: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_5.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_6.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/armor/piercing_impact_armor_7.ogg"
                            ],
                    flesh: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_5.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/impacts/flesh/piercing_impact_flesh_6.ogg"
                            ]
                },
                swings: {
                    light: {},
                    medium: {
                        spear: [
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_3.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_4.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_5.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/melee/piercing/swings/medium/spear/piercing_swing_medium_spear_6.ogg"
                            ]
                    },
                    heavy: {}
                }
            },
            bludgeoning: {
                impact: {
                    armor: [
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/armor/bludgeoning_impact_armor_5.ogg"
                        ],
                    flesh: [
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_1.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_2.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_3.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_4.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_5.ogg",
                        "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/flesh/bludgeoning_impact_flesh_6.ogg"
                        ]
                },
                swings: {
                    light: {},
                    medium: {
                        hydraulic_punch: ["modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/swings/medium/hydraulic_punch/hydraulic_punch.ogg"]
                    },
                    heavy: {}
                }
            }
        },
        ranged: {
            gun: {
                pistol: {
                    fire: [
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/gun/pistol/fire/ranged_gun_pistol_fire_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/gun/pistol/fire/ranged_gun_pistol_fire_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/gun/pistol/fire/ranged_gun_pistol_fire_3.ogg"
                            ]
                }
            },
            archery: {},
            energy: {
                laser: {
                    fire: 
                        [
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/laser/fire/ranged_energy_laser_fire_1.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/laser/fire/ranged_energy_laser_fire_2.ogg",
                            "modules/johns-cypher-addons/library/SFX/weapon/ranged/energy/laser/fire/ranged_energy_laser_fire_3.ogg"
                        ],
                    impact: []
                }
            }
        }
    }
}