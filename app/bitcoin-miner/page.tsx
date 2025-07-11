import { Metadata } from "next";
import MinerPageClient from "./minerPageClient"

export const metadata: Metadata = {
    title: "Manual Mining",
    description: "manual creation and mining of a fake block",
};


export default function ManualMiner() {




    return (
        <main>
            <MinerPageClient />
        </main>
    );
}