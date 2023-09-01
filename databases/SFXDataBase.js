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
        cypher: {},
        artifact: {},
        oddity: {},
        equipment: {},
        material: {},
        consumable: {}
    },
    ability: {
        action: {
            spend_calamity: ["modules/johns-cypher-addons/library/SFX/ability/action/spend_calamity/spend_calamity.ogg"],
            charge: ["modules/johns-cypher-addons/library/SFX/ability/action/charge/charge.ogg"],
            broadcast: {
                cast: ["modules/johns-cypher-addons/library/SFX/ability/action/broadcast/broadcast_cast.ogg"],
                break: ["modules/johns-cypher-addons/library/SFX/ability/action/broadcast/broadcast_break.ogg"]
            }
        },
        enabler: {
            absorb_calamity: ["modules/johns-cypher-addons/library/SFX/ability/enabler/absorb_calamity/absorb_calamity.ogg"],
            duplicity: ["modules/johns-cypher-addons/library/SFX/ability/enabler/duplicity/duplicity.ogg"],
            frenzy: ["modules/johns-cypher-addons/library/SFX/ability/enabler/frenzy/frenzy.ogg"]
        }
    },
    weapon: {
        melee: {
            slashing: {
                impact: {
                    light: {},
                    medium: {},
                    heavy: {}
                },
                swings: {
                    light: {},
                    medium: {},
                    heavy: {}
                }
            },
            piercing: {
                impact: {
                    light: {},
                    medium: {},
                    heavy: {}
                },
                swings: {
                    light: {},
                    medium: {},
                    heavy: {}
                }
            },
            bludgeoning: {
                impact: {
                    light: {},
                    medium: {
                       flesh : [
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/medium/flesh/bludgeon_impact_medium_flesh_1.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/medium/flesh/bludgeon_impact_medium_flesh_2.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/medium/flesh/bludgeon_impact_medium_flesh_3.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/medium/flesh/bludgeon_impact_medium_flesh_4.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/medium/flesh/bludgeon_impact_medium_flesh_5.ogg",
                                "modules/johns-cypher-addons/library/SFX/weapon/melee/bludgeoning/impacts/medium/flesh/bludgeon_impact_medium_flesh_6.ogg"
                                ]
                    },
                    heavy: {}
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
            bow: {
                light: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                medium: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                heavy: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                special: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                }
            },
            thrown: {
                light: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                medium: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                heavy: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                special: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                }
            },
            gun: {
                light: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                medium: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                heavy: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                },
                special: {
                    weponName: {
                        attack: {},
                        reload: {},
                        miss: {},
                        hit: {}
                    }
                }
            }
        }
    }
}