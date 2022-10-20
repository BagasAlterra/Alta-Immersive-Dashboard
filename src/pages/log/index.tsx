import { FC } from "react";

import { useTitle } from "utils/useTitle";

import Layout from "components/Layout";
import LogSection from "components/LogSection";
import LogProfile from "components/LogProfile";
import Button from "components/Button";

const Log: FC = () => {
    useTitle("Mentee Log | Immersive Dashboard");

    const profile = {
        name: "Rachman Kamil",
        joined_class: "Quality Engineering Batch 8",
        major: "IPA",
        graduate: "SMA Negeri 4 Surabaya",
        phone: +6281234567890,
        telegram: "@rachmankamil",
        email: "rachmankamil24@gmail.com"
    }

    const log = [
        {
            section: "End Of Section",
            name: "Bagas",
            date: "Sep 29, 2022",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            status: "Continue Section 2"
        },
        {
            section: "Acceptance",
            name: "Mail",
            date: "Aug 22, 2022",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            status: "Join Class"
        },
        {
            section: "Interview",
            name: "Revin",
            date: "Aug 20, 2022",
            feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            status: "None"
        },
    ]

    return (
        <Layout subTitle="Mentee Log">
            <div className="lg:ml-4 lg:my-5 lg:items-center
            md:ml-4 md:my-5 md:items-center 
            sm:ml-4 sm:my-5 sm:items-center mx-5 mt-5
            ">
                <LogProfile
                    name={profile.name}
                    joined_class={profile.joined_class}
                    major={profile.major}
                    graduate={profile.graduate}
                    phone={profile.phone}
                    telegram={profile.telegram}
                    email={profile.email}
                />
            </div>
            <div className="flex justify-end mr-10 mt-10">
                <Button
                    type="long"
                    title="Add New Log"
                    onClick={() => alert("Test Button")}
                />
            </div>
            {
                log &&
                log.map((item) => {
                    return (
                        <div className="mx-10 my-10">
                            <LogSection
                                section={item.section}
                                name={item.name}
                                date={item.date}
                                feedback={item.feedback}
                                status={item.status}
                            />
                        </div>

                    )
                })
            }
        </Layout>
    );
};

export default Log;
