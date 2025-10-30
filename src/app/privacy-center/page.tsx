"use client";
import Footer from "@/components/Footer";
import PageDivider from "@/components/PageDivider";
import PageHeader from "@/components/PageHeader";
import styled from "styled-components";

const StyledContainer = styled.div`
    color: #b4add9;
    font-size: 1.5rem;
    display: flex;
    flex-flow: column;
    gap: 1rem;
    a {
        color: white;
    }
    li {
        margin-left: 2rem;
    }
    p {
        margin: 0;
        line-height: 2rem;
    }
    h1,h2,h3 {
        color: white;
        font-weight: 700;
    }
    h1 {
        font-size: 2.5rem;
    }
`

const Privacy = () => {
    return (
        <div className="w-full h-full bg-[url('/background.svg')] bg-cover">
            <PageHeader />

            <div className="px-8 md:px-[10%] flex justify-center">
                <div className="flex gap-12 py-8 flex-col w-full max-w-full pb-48">
                    <StyledContainer>
                        <div className="text-center text-white mt-16">
                            <h1>Privacy Policy</h1>
                            <p><strong>Cookies</strong></p>
                        </div>
                        <h2>1/ Strictly Necessary Cookies</h2>
                        <p>
                            These cookies are necessary for the website to function and cannot be
                            switched off. They are usually only set in response to actions made by you
                            such as setting your currency preferences, filling forms. You can set your
                            browser to block or alert you about these cookies, but some parts of the
                            site may not work then.
                        </p>
                        <p>
                            Cookies used:
                        </p>
                        <ul className="list-disc">
                            <li>Preferences cookies</li>
                            <li>Cart retainer cookie</li>
                            <li>Provenance cookie</li>
                        </ul>
                        <h2>2/ Performance Cookies</h2>
                        <p>
                            These cookies allow us to count visits and traffic sources, so we can
                            measure and improve the performance of our site. They help us know which
                            pages are the most and least popular and see how visitors move around the
                            site. All information these cookies collect is aggregated and therefore
                            anonymous.
                        </p>
                        <p>
                            Cookies used:
                            <br />
                            Google Analytics
                        </p>
                        <h2>3/ Personal data</h2>
                        <p>
                            The Pictosso website does not store any private data. There are no login
                            or sign up forms, no user accounts.
                        </p>

                        <h2>4/ Browser storage</h2>
                        <p>
                            Pictosso uses browser storage to cache your Pictosso project. Data does
                            not contain any personal information. Data is generic, not specific to any
                            user. The only purpose is to speed up loading of icon data, similar to browser
                            cache.
                        </p>
                        <h2>5/ More information</h2>
                        <p>
                            If you have concerns data you may have provided to PICTOSSO at any moment,
                            feel free to contact us at support@pictosso.com
                        </p>
                    </StyledContainer>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Privacy;
