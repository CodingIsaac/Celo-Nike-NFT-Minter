import React from "react";
import Cover from "./components/minter/Cover";
import { Notification } from "./components/ui/Notifications";
import Wallet from "./components/Wallet";
import { useBalance, useMinterContract } from "./hooks";
import Nfts from "./components/minter/nfts";
import { useContractKit } from "@celo-tools/use-contractkit";
import "./App.css";
import { Container, Nav } from "react-bootstrap";
import coverImg from "./assets/img/nike.png";
// ...

// ... 
const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const minterContract = useMinterContract();
// ...
// ...
return (
  <>
    <Notification />
    {address ? (
      <Container fluid="md">
        <Nav className="justify-content-end pt-3 pb-5">
          <Nav.Item>
            <Wallet
              address={address}
              amount={balance.CELO}
              symbol="CELO"
              destroy={destroy}
            />
          </Nav.Item>
        </Nav>
        <main>
          <Nfts
            name="Nike Collection"
            updateBalance={getBalance}
            minterContract={minterContract}
          />
        </main>
      </Container>
    ) : (
      <Cover name="Nike Collection" coverImg={coverImg} connect={connect} />
    )}
  </>
);
};

export default App;
