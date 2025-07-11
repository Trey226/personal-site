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
                    I will start the page off by saying I am not a "crypto bro". I just wanted to try my hand at a more informative
                    and interactive page, and Bitcoin <i>is</i> mathmatically interesting. I had the idea to make this page after watching <a href="https://www.youtube.com/watch?v=bBC-nXj3Ng4" target="_blank" rel="noopener noreferrer">this video </a>
                    by 3Blue1Brown. During a Cybersecurtiy class I took, (shout out Dr.Park!) we learned the nitty gritty details of how cryptographic
                    hash functions are implemented in the block chain, but not exactly what it means to mine a Bitcoin. After watching that 3Blue1Brown video I had a renewed interest in learning the exact
                    way a Bitcoin is mined, and there is no better way to learn than to explain, so I made this page to assemble and "mine" a Bitcoin block. I am going to
                    gloss over many of the details about the peer-to-peer nature of the system as the 3B1B video does a much better job at that than I care to replicate here. So from here on
                    out just recognize that what you are doing is acting as any random machine in the network.
                </p>
            </div>
            <div className="miner-section">
                <h2 className="miner-title">The Anatomy of a Block</h2>
                <p className="miner-general-text">
                    Any Bitcoin block is, at it's core, only made up of two sections: a header, and a body. Each of those sections has several sub-parts that I will
                    explain in more detail below as we will need each one to assemble and mine our block. This illustration is going to serve as the recipe for the block you are going to
                    create. (This was the first misconception that I had while doing a bit of research to make this page. As a miner you are <b>creating</b> the blocks.)
                    <br />
                    Some of the descriptions below are a bit hand-wavey, but they will make more sense when you construct your block.
                </p>
            </div>
            <img src={"./block.png"} className="visuals" />
            <div className="miner-section">
                <br />
                <h2 className="miner-title">Header: </h2>
                <ul className="miner-general-text">
                    <br />
                    <li>
                        <b>Block Version: </b>
                        <br />
                        This is a 32 bit number that is used to tell the other nodes in the system which standards your block is following.
                        <br />
                        The current widely accepted block version is "0x20000000".
                    </li>
                    <li>
                        <b>Parent Block Hash: </b>
                        <br />
                        Any block hash is computed by SHA256(SHA256(header))
                        <br />
                        By including the previous hash in your new hash you are linking the new block to the previous block which is linked to the previous 
                        block which is linked to the previos block which is ... you get the point,
                         all of the way back to the very first block ever mined
                         , the "<a href="https://www.blockchain.com/explorer/blocks/btc/0" target="_blank" rel="noopener noreferrer">genesis block</a>". 
                        <br />
                        This means that if you tried to change a block at any given point in the block-chain you would have to change every block 
                        after it as well. 
                        <br />
                        <a href="/bitcoin.pdf" target="_blank" rel="noopener noreferrer">The original white paper </a>
                        has multiple pages explaining just how impossible of a task this is.
                        <br />
                    </li>
                    <li>
                        <b>Merkle Tree Root Hash: </b>
                        <br />
                        This is much easier to show than tell, but this is an <b>order sensitive </b> (important later) hash of every transaction
                        that the miner has <b>chosen </b> to include in their block.

                    </li>
                    <li>
                        <b>nBits: </b>
                        <br />
                        Often refered to as the "difficulty" of a block this is how to verify that you successfully "mined" a block. Again a bit easier to 
                        show than tell, but the TLDR is that the Block hash (as explained above) of this block has to have a certain number of leading 0's.
                    </li>
                    <li>
                        <b>Nonce:</b>
                        <br />
                        This 32 bit number is the main way a miner "searches" for the number of 0's specified by the nBits (difficulty). The watered down version is 
                        just increment the nonce by 1 and rehash the header. This was actually the most confusing part to me when we glossed over the bitcoin block in class. 
                        The largest 32 bit number is just over 4 billion, meaning there are only ~4 billion possible hashes to check? Even the phone/computer you are reading 
                        this on could compute all 8 billion hashes (since you have to compute SHA256 twice) in less than 1 minute. so where is the difficulty? This was the 
                        biggest key I was missing, you probably <i>won't </i> find the hash you are looking for in that 32 bit "search space", which leads me to the first piece of the puzzle.
                    </li>
                    <li>
                        <b>Timestamp: </b>
                        <br />
                        The Timestamp updates <b>EVERY SECOND</b>, and any change in the header changes the SHA256 hash dramatically. 
                        so now you have 4 billion gueses to make per second. requiring 8 billion hashes per second but even that amount of compute is obtainable for 
                        less than $1000.
                    </li>
                </ul>
                <hr />
                <div className="miner-section">
                    
                </div>
            </div>
        </div>
    )
}


