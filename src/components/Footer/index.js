import { BreakLine, Container, Logo, Social, Wrapper } from "./styles";
import exyrium from '../../assets/exyriumlabs.png';
import twitter from '../../assets/twitter.svg';
import telegram from 'assets/telegram.svg';

export default function Footer() {
  return (
    <Wrapper>
      <BreakLine />
      <Container>
        <Logo
          alt='exyrium'
          src={exyrium}
        />
        <Social>
          <a href='https://twitter.com/exyrium' target='_blank' rel="noreferrer">
            <img 
              src={twitter}
              alt='twitter'
              width={30}
            />
          </a>
          <a href='https://t.me/exyrium' target='_blank' rel="noreferrer">
            <img 
              src={telegram}
              alt='telegram'
              width={30}
            />
          </a>
        </Social>
      </Container>
    </Wrapper>
  )
}

