import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Container,
  IntraNav,
  SingleColumn,
  Section,
} from "@urbit/foundation-design-system";
import { useState } from "react";
import ob from "urbit-ob";
import Sigil from "../../components/Sigil";

export default function SigilGenerator({ search }) {
  const [background, setBackground] = useState("#24201E");
  const [foreground, setForeground] = useState("#ffffff");
  const [patp, setPatp] = useState("~wolref-podlex");
  return (
    <Container>
      <IntraNav ourSite="https://urbit.org" search={search} />
      <Header />
      <SingleColumn>
        <Section>
          <h2>Urbit ID</h2>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex space-x-2 items-center border w-full justify-between max-w-sm rounded-xl pl-2 overflow-hidden my-4">
                <p className="h-full w-32 font-bold">Urbit ID</p>
                <input
                  type="text"
                  onChange={(e) => setPatp(e.target.value)}
                  value={patp}
                  className="h-full min-w-0 p-4 text-white"
                />
              </div>
              <div className="flex space-x-2 items-center border w-full justify-between max-w-sm rounded-xl pl-2 overflow-hidden my-4">
                <p className="h-full w-36 font-bold">Background</p>
                <div className="flex bg-black text-white border p-3 min-w-0 items-center space-x-2">
                  <input
                    type="text"
                    onChange={(e) => setBackground(e.target.value)}
                    value={background}
                    className="min-w-0"
                  />
                  <input
                    type="color"
                    value={
                      /^#[0-9A-F]{6}$/i.test(background)
                        ? background
                        : "#24201E"
                    }
                    onChange={(e) => setBackground(e.target.value)}
                    className="h-8 w-8"
                  />
                </div>
              </div>
              <div className="flex space-x-2 items-center border w-full justify-between max-w-sm rounded-xl pl-2 overflow-hidden">
                <p className="h-full w-36 font-bold">Foreground</p>
                <div className="flex bg-black text-white border p-3 min-w-0 items-center space-x-2">
                  <input
                    type="text"
                    onChange={(e) => setForeground(e.target.value)}
                    value={foreground}
                    className="min-w-0"
                  />
                  <input
                    type="color"
                    value={
                      /^#[0-9A-F]{6}$/i.test(foreground)
                        ? foreground
                        : "#ffffff"
                    }
                    onChange={(e) => setForeground(e.target.value)}
                    className="h-8 w-8"
                    style={{ WebkitAppearance: "text" }}
                  />
                </div>
              </div>
              <div className="flex justify-between space-x-2 my-4">
                <a
                  href={`/api/sigil?patp=${patp}&color=${background.slice(
                    1
                  )}&foreground=${foreground.slice(1)}`}
                  className="button-lg bg-green-400 text-white w-full"
                  target="_blank"
                >
                  PNG
                </a>
                <a
                  href={`/api/sigil?patp=${patp}&color=${background.slice(
                    1
                  )}&foreground=${foreground.slice(1)}&filetype=svg`}
                  className="button-lg bg-green-400 text-white w-full"
                  target="_blank"
                >
                  SVG
                </a>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <Sigil
                patp={ob.isValidPatp(patp) ? patp : "~wolref-podlex"}
                size="500"
                color={
                  /^#[0-9A-F]{6}$/i.test(background) ? background : "#24201E"
                }
                foregroundColor={
                  /^#[0-9A-F]{6}$/i.test(foreground) ? foreground : "#ffffff"
                }
              />
            </div>
          </div>
        </Section>
      </SingleColumn>
      <Footer />
    </Container>
  );
}
