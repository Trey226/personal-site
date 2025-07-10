'use client'

import { useState } from "react";
import "./miner.css"

const privateKey = "MIICXQIBAAKBgQCao4Bz1uZhxp+KHXO5fU6oltdx7CvaE9JgyaGTBkRjQV0vTVDQpYjZFQTDLL9rQun4cK7koRmYAdEiP1zvhqxvuFfC0Mfp/c1jfEjWs/VlIIuG/bz0owliOPamlZPs3gCck+qk20ycw1/o0ciqWsuvM7iVzFl8dys+ioA8vnGEEwIDAQABAoGAP41unyz0pb5xltuf0d2z1AmaJZHAO/Hlhi2Xn8r1lC0q1OPbkMRXR5Ah0uyzBqwLaDU3S3MCB7zHbGHKGg6pEuT3WmNQmtErxSKYIiD5VG7uiO5AyUK7VtPLyFh3W1kibKHQkANyQGo7ObTgU1W4ReTHhCHLw+80hknoL2JvggECQQDYpaV+wMzEtNvIc9OG3IPP7FvoeWjylMek3TxTKe3WfHRhQApfwktP/3tgmf7sVN2dUR5Z4jR1oHTxAaG6eJOTAkEAtrpjyDMyHdSp2+RTvyH9xQHd1xsPaQMo5C4iTm5LSl/jpcuRQ07R6W28FUpYarkW2Q6NAqdIW6R5W09pbtqdgQJBALHdRQLMbRDt3ycyGK626izRQx+YVdYa2dF7pOQuH0qhgLa66gl2LXivKm7D32vNvOhESePHeAQ+SOP4z/uUtKsCQEwLYb9NXwv/FvmGGjwu3zd/wVzlzBH92KStdmWBjR/UrB6xizChusYUfvO1TvqLMLEAVzrFd118I20WrWAO5wECQQCyh8UqY9Nux1IGSlCnTYlz4/W3mBMDlhmePDCnOuGK0p6pviC1UlG+IBpqRq5weEfcl5XFAx6VlihBm/sJ4n6u"

const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCao4Bz1uZhxp+KHXO5fU6oltdx7CvaE9JgyaGTBkRjQV0vTVDQpYjZFQTDLL9rQun4cK7koRmYAdEiP1zvhqxvuFfC0Mfp/c1jfEjWs/VlIIuG/bz0owliOPamlZPs3gCck+qk20ycw1/o0ciqWsuvM7iVzFl8dys+ioA8vnGEEwIDAQAB"

export default function MinerPageClient() {


    return (
        <div className="miner-content-area">
            <div className="miner-section">
                <h2 className="miner-title">Introduction</h2>
                <p className="miner-general-text">
                    I will start the page off by saying I am not a "crypto bro". I just wanted to try my hand at a bit more informative
                    and interactive content, and Bitcoin <i>is</i> mathmatically interesting. I had the idea to make this page after watching <a href="https://www.youtube.com/watch?v=bBC-nXj3Ng4" target="_blank" rel="noopener noreferrer">this video </a>
                    by 3Blue1Brown. During a Cybersecurtiy class I took, (shout out Dr.Park!) we learned the nitty gritty details of how cryptographic
                    hash functions are implemented in the block chain, but not exactly how a Bitcoin is mined. After watching that 3Blue1Brown video I had a renewed interest in learning the exact
                    way a Bitcoin is mined, and there is no better way to learn than to explain, so I made this page to assemble and "mine" a Bitcoin block. I am going to
                    gloss over many of the details about the peer-to-peer nature of the system as the 3B1B video does a much better job at that than I care to replicate here. So from here on
                    out just recognize that what you are doing is acting as a particular node in the network.
                </p>
            </div>
            <div className="miner-section">
                <h2 className="miner-title">The Anatomy of a "Block"</h2>
                <p className="miner-general-text">
                    Any Bitcoin block is, at it's core, only made up of two sections: a header, and a body. Each of those sections has several sub-parts that I will
                    explain in more detail below as we will need each one to assemble and mine our block. This illustration is going to serve as the recipe for the block you are going to
                    create. (This was the first misconception that I had while doing a bit of research to make this page. As a miner <b>you</b> are creating the blocks.)
                </p>
            </div>
            <img src={"./block.png"} width={600} className="visuals" />
            <div className="miner-section">
                <h2 className="miner-title">
                    "Ingredients" of The Block
                </h2>
                <ul className="miner-general-text">
                    These are all of the components needed to create a new block. I will
                    <br />
                    <li>
                        <b>Block Version: </b> This is a 4 byte number used to iterate on the accepted standards for a block over time.
                        <br />
                        The current block version is "0x20000000"
                    </li>
                    <li>
                        <b>Parent Block Hash: </b> this is the SHA256 hash of the previously mined block 
                        <br />
                        The real hash of the most recently mined block is [hash here] and it was mined [real minutes ago] minutes ago.
                    </li>
                    <li>
                        <b></b>
                    </li>

                </ul>
            </div>
        </div>
    )
}


