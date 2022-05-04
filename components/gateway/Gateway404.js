import GatewayHeader from "./GatewayHeader";
import Container from "../Container";
import SingleColumn from "../SingleColumn";
import Section from "../Section";
import Link from "next/link";

const Gateway404 = ({ type }) => {
  return (
    <Container>
      <SingleColumn>
        <Section narrow className="space-y-12">
          <GatewayHeader
            title="Error 404"
            error
            item={`No ${type} at this address`}
          />
          <hr className="text-wall-200" />
          <Link href="/">
            <a className="text-xl block font-semibold">Urbit.org</a>
          </Link>
        </Section>
      </SingleColumn>
    </Container>
  );
};

export default Gateway404;
