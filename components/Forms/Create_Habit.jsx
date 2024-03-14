"use client"
import themeColors from "@/constants/colors";
import { useState } from "react";
import { MdDone } from "react-icons/md";

export default function Create_Habit() {

    const [completion, setCompletion] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello world");
    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <form onSubmit={handleSubmit} style={{
                border: '1px solid white',
            padding: "20px",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <button>close</button>
                    <h1>New Habit</h1>
                    <button type="submit"><MdDone /></button>
                </div>
                    <div>
                        <label>Name</label>
                        <br/>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Description</label>
                        <br/>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Completion per day</label>
                        <div style={{
                            display: "flex",
                            
                        }}>
                            <input type="text" value={completion+" /Day"} />
                            <div style={{
                            }}>
                                <button style={{
                                    borderTopLeftRadius: "5px",
                                    borderBottomLeftRadius: "5px",
                                }} onClick={(e)=>{
                                    e.preventDefault();
                                    setCompletion(Math.max(completion-1,0))
                                }}>-</button>
                                <button style={{
                                    borderTopRightRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                }} onClick={(e)=>{
                                     e.preventDefault();
                                     setCompletion(Math.min(completion+1,10))
                                }}>+</button>
                            </div>
                        </div>
                    </div>
                    <label>Icon</label>
                    <br />
                    <label>Color</label>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "100px"
                    }}>
                        {
                            themeColors.map((color, index) => {
                                return (
                                    <div key={index} style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: color,
                                        borderRadius: "100%",
                                    }}>
                                    </div>
                                )
                            })
                        }
                    </div>
            </form>
        </div>
    )
}