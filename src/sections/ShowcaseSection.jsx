import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Fade in section
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 });

    // Stagger main and small cards
    gsap.fromTo(
      ".project-card",
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Additional micro animation for right-side mini items
    gsap.fromTo(
      ".project-mini",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".project-list-wrapper",
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="app-showcase section-padding">
      <div className="w-full md:px-10 px-5">
        <TitleHeader title="Selected Projects" sub="What I've Built" />

        <div className="showcaselayout mt-8 flex flex-col xl:flex-row gap-8">
          {/* Featured project (left) */}
          <article
            ref={rydeRef}
            className="first-project-wrapper project-card group relative overflow-hidden rounded-2xl shadow-xl transform transition duration-500 hover:scale-[1.02]"
            aria-labelledby="feat-title"
          >
            <div className="image-wrapper relative w-full h-[420px] md:h-[520px]">
              <img
                src="/images/project1.webp"
                alt="open-source SOC environment"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <h3 id="feat-title" className="text-white text-2xl md:text-4xl font-bold leading-tight">
                  A script-based solution for a fully integrated, open-source SOC environment
                </h3>
                <p className="mt-4 text-white-50 md:text-lg max-w-2xl">
                  Automated SIEM deployment using Wazuh, Graylog, and Grafana — infrastructure-as-code for security teams.
                </p>
                <div className="mt-6">
                  <a
                    href="https://github.com/MohamedNourDerbeli/SOC-SIEM"
                    target="_blank"
                    className="inline-block bg-white text-black font-semibold px-5 py-3 rounded-lg shadow-md transition hover:translate-y-[-2px]"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Right column: two smaller projects */}
          <div className="project-list-wrapper grid grid-cols-1 gap-6 xl:w-[40%]">
            <article
              ref={libraryRef}
              className="project-mini project-card card-border rounded-xl overflow-hidden transform transition hover:scale-105 shadow-lg"
              aria-labelledby="lib-title"
            >
              <figure className="image-wrapper relative w-full h-44 md:h-56 bg-black">
                <img
                  src="/images/project2.jpeg"
                  alt="reputation protocol"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </figure>
              <figcaption className="p-5">
                <h4 id="lib-title" className="text-lg font-semibold">
                  TrustFi — Decentralized Reputation Protocol
                </h4>
                <p className="mt-2 text-white-50 text-sm">
                  Portable on-chain Trust Scores to represent achievements and reputations.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a href="https://github.com/MohamedNourDerbeli/TrustFi" target="_blank" className="text-accent hover:underline font-medium">Details</a>
                </div>
              </figcaption>
            </article>

            <article
              ref={ycDirectoryRef}
              className="project-mini project-card card-border rounded-xl overflow-hidden transform transition hover:scale-105 shadow-lg"
              aria-labelledby="lfs-title"
            >
              <figure className="image-wrapper relative w-full h-44 md:h-56 bg-black">
                <img
                  src="/images/project3.jpg"
                  alt="Linux From Scratch"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </figure>
              <figcaption className="p-5">
                <h4 id="lfs-title" className="text-lg font-semibold">
                  Linux From Scratch (LFS) Automated Build
                </h4>
                <p className="mt-2 text-white-50 text-sm">
                  Automating the LFS build pipeline for reproducible system builds.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a href="https://github.com/MohamedNourDerbeli/Linux-From-Scratch" target="_blank" className="text-accent hover:underline font-medium">Details</a>
                </div>
              </figcaption>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
