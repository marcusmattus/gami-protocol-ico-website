import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import ErrorBoundary from '../components/ErrorBoundary';

export default function TermsPage() {
    return (
        <ErrorBoundary>
            <section className="min-h-screen border-b-[3px] border-black bg-white p-8 lg:p-16">
                <div className="container mx-auto max-w-4xl">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 border-[3px] border-black bg-white px-6 py-3 font-black uppercase hover:bg-black hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        BACK TO HOME
                    </Link>

                    <div className="border-[3px] border-black bg-black text-white p-6 mb-8">
                        <h1 className="text-3xl lg:text-4xl font-black uppercase">TERMS & CONDITIONS</h1>
                        <div className="text-sm font-mono mt-2">LAST UPDATED: DECEMBER 3, 2025</div>
                    </div>

                    <div className="space-y-8 font-mono text-sm leading-relaxed">
                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">1. ACCEPTANCE OF TERMS</h2>
                            <p className="mb-4">
                                BY ACCESSING OR USING THE GAMI PROTOCOL ICO PLATFORM, YOU AGREE TO BE BOUND BY THESE TERMS
                                AND CONDITIONS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THIS PLATFORM.
                            </p>
                            <p>
                                THESE TERMS CONSTITUTE A LEGALLY BINDING AGREEMENT BETWEEN YOU AND GAMI PROTOCOL. YOUR
                                PARTICIPATION IN THE ICO IS SUBJECT TO COMPLIANCE WITH ALL APPLICABLE LAWS AND REGULATIONS.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">2. ELIGIBILITY</h2>
                            <p className="mb-4">
                                YOU MUST BE AT LEAST 18 YEARS OLD AND HAVE THE LEGAL CAPACITY TO ENTER INTO THESE TERMS.
                                PARTICIPATION IN THE ICO IS PROHIBITED FOR RESIDENTS OF RESTRICTED JURISDICTIONS.
                            </p>
                            <p className="mb-4">RESTRICTED JURISDICTIONS INCLUDE BUT ARE NOT LIMITED TO:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>UNITED STATES OF AMERICA</li>
                                <li>PEOPLE'S REPUBLIC OF CHINA</li>
                                <li>DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA</li>
                                <li>ANY JURISDICTION WHERE TOKEN SALES ARE PROHIBITED</li>
                            </ul>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">3. KYC/AML REQUIREMENTS</h2>
                            <p className="mb-4">
                                ALL PARTICIPANTS MUST COMPLETE KNOW YOUR CUSTOMER (KYC) AND ANTI-MONEY LAUNDERING (AML)
                                VERIFICATION PROCEDURES BEFORE PARTICIPATING IN THE ICO.
                            </p>
                            <p className="mb-4">REQUIRED INFORMATION INCLUDES:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>FULL LEGAL NAME</li>
                                <li>DATE OF BIRTH</li>
                                <li>RESIDENTIAL ADDRESS</li>
                                <li>GOVERNMENT-ISSUED IDENTIFICATION</li>
                                <li>PROOF OF ADDRESS</li>
                            </ul>
                            <p className="mt-4">
                                GAMI PROTOCOL RESERVES THE RIGHT TO REJECT ANY PARTICIPANT WHO FAILS TO MEET KYC/AML
                                REQUIREMENTS OR PROVIDES FALSE INFORMATION.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">4. TOKEN SALE TERMS</h2>
                            <p className="mb-4">
                                THE GAMI TOKEN SALE IS CONDUCTED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TOTAL SUPPLY IS
                                FIXED AT 1,000,000,000 TOKENS WITH NO FUTURE INFLATION.
                            </p>
                            <p className="mb-4">TOKEN ALLOCATION:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>TEAM: 20% (12 MONTH CLIFF, 36 MONTH VESTING)</li>
                                <li>INVESTORS: 30% (6 MONTH CLIFF, 24 MONTH VESTING)</li>
                                <li>PARTNERS: 10% (0 MONTH CLIFF, 18 MONTH VESTING)</li>
                                <li>PUBLIC SALE: 40%</li>
                            </ul>
                            <p className="mt-4">
                                ALL CONTRIBUTIONS ARE FINAL AND NON-REFUNDABLE EXCEPT AS REQUIRED BY APPLICABLE LAW.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">5. RISKS</h2>
                            <p className="mb-4">
                                PARTICIPATION IN THE ICO INVOLVES SIGNIFICANT RISKS INCLUDING BUT NOT LIMITED TO:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>LOSS OF ENTIRE INVESTMENT</li>
                                <li>REGULATORY UNCERTAINTY</li>
                                <li>TECHNOLOGY RISKS AND VULNERABILITIES</li>
                                <li>MARKET VOLATILITY</li>
                                <li>LACK OF LIQUIDITY</li>
                            </ul>
                            <p className="mt-4">
                                YOU ACKNOWLEDGE THAT YOU HAVE CAREFULLY REVIEWED THE WHITEPAPER AND UNDERSTAND THE RISKS
                                INVOLVED. ONLY INVEST WHAT YOU CAN AFFORD TO LOSE.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">
                                6. NO INVESTMENT ADVICE
                            </h2>
                            <p>
                                NOTHING ON THIS PLATFORM CONSTITUTES INVESTMENT, LEGAL, TAX, OR FINANCIAL ADVICE. YOU
                                SHOULD CONSULT WITH YOUR OWN ADVISORS BEFORE PARTICIPATING IN THE ICO.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">7. INTELLECTUAL PROPERTY</h2>
                            <p>
                                ALL CONTENT, TRADEMARKS, AND INTELLECTUAL PROPERTY ON THIS PLATFORM ARE OWNED BY GAMI
                                PROTOCOL. UNAUTHORIZED USE IS STRICTLY PROHIBITED.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">8. LIMITATION OF LIABILITY</h2>
                            <p className="mb-4">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, GAMI PROTOCOL SHALL NOT BE LIABLE FOR ANY INDIRECT,
                                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR PARTICIPATION IN
                                THE ICO.
                            </p>
                            <p>
                                IN NO EVENT SHALL GAMI PROTOCOL'S TOTAL LIABILITY EXCEED THE AMOUNT YOU CONTRIBUTED TO THE
                                ICO.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">9. GOVERNING LAW</h2>
                            <p>
                                THESE TERMS SHALL BE GOVERNED BY AND CONSTRUED IN ACCORDANCE WITH THE LAWS OF [JURISDICTION
                                TO BE DETERMINED], WITHOUT REGARD TO ITS CONFLICT OF LAW PROVISIONS.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">10. MODIFICATIONS</h2>
                            <p>
                                GAMI PROTOCOL RESERVES THE RIGHT TO MODIFY THESE TERMS AT ANY TIME. CONTINUED USE OF THE
                                PLATFORM AFTER MODIFICATIONS CONSTITUTES ACCEPTANCE OF THE UPDATED TERMS.
                            </p>
                        </section>

                        <section className="border-[3px] border-black p-6 bg-white">
                            <h2 className="text-xl font-black uppercase mb-4 text-gami-purple">11. CONTACT</h2>
                            <p className="mb-4">FOR QUESTIONS REGARDING THESE TERMS, CONTACT:</p>
                            <p className="font-black">LEGAL@GAMIPROTOCOL.IO</p>
                        </section>

                        <div className="border-[3px] border-black bg-gami-purple text-white p-6 text-center">
                            <p className="font-black text-lg">
                                BY PARTICIPATING IN THE GAMI PROTOCOL ICO, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD,
                                AND AGREE TO BE BOUND BY THESE TERMS AND CONDITIONS.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </ErrorBoundary>
    );
}
