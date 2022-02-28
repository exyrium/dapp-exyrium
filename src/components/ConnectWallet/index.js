import { useContext, useEffect, useState } from "react";
import { Row, Col } from "antd";
import { DropdownStyled, Network } from "./styles";
import { ReactComponent as Wallet } from 'assets/wallet.svg';
import { 
  BtnConnect,
  MenuStyled ,
  MenuItem
} from "./styles";
import { Context } from "context/contex";
import ModalComponent from "components/Modal";
import metamask from 'assets/metamask.webp';
import { ReactComponent as Logout } from 'assets/logout.svg'


export default function ConnectWallet() {
  const { account, connectMetamask, disconnectWallet } = useContext(Context);
  const [modal, setModal] = useState(false);

  const menuDropdown = (
    <MenuStyled>
      <MenuItem key='1'>
        <Row justify='space-between' onClick={disconnectWallet}>
          Disconnect <Logout /> 
        </Row>
      </MenuItem>
    </MenuStyled>
  );

  const handleOpenModal = () => {
    if(!account) setModal(true);
  }

  useEffect(()=>{
    const wallet = localStorage.getItem('wallet');
    function connect() {
      if(wallet === 'metamask') connectMetamask();
      
    };
    connect();
  }, [])


  return (
    <div>
      {
        account ? (
          <DropdownStyled overlay={menuDropdown}>
            <Row align='middle' justify='center'>
              {
                  <img src={metamask} alt='metamask' width='24' />
              }
              <span style={{marginLeft: '4px'}}>{`0x...${account.slice(-5)}`}</span>
            </Row>
          </DropdownStyled>
        ) : (
          <BtnConnect type='ghost' onClick={handleOpenModal}>
            <Row align='middle' justify='center'>
              <Wallet />
              <span style={{marginLeft: '4px'}}> Connect Wallet</span>
            </Row>
          </BtnConnect>
        )
      }
      
      {!account && (
        <ModalComponent
          width={420}
          visible={modal}
          title=''
          onCancel={() => setModal(false)}
        >
          <Row>
            <Col span={12}>
              <Network onClick={connectMetamask}>
                <img src={metamask} alt='metamask' width='32' height='32' />
                <p>Metamask</p>
              </Network>
            </Col>
          </Row>
        </ModalComponent>
      )}
    </div>
  )
}
