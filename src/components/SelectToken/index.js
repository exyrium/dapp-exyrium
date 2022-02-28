import { useContext, useEffect } from "react"
import { ethers } from "ethers"
import { Context } from "context/contex"
import { SortOption, SortSelect } from "./styled"
import vex from 'assets/vex.png'
import { ErrorHandling } from "utils/errorHandling"
import { ReadContract } from "utils/readContract"

export default function SelectToken() {
  const { setSelectedToken, setSelectedTokenPrice, setLoading } = useContext(Context);
  

  const handleSelectToken = async(value) => {
    setSelectedToken(value);
    try {
      setLoading(true);
      const contract = await ReadContract();
  
      if(value === 'vex') {
        const data = await contract.getPrice();
        console.log(ethers.utils.formatUnits(data, 8))
        const price = Number(ethers.utils.formatUnits(data, 8));
        setSelectedTokenPrice(price);
        setLoading(false);
      } else {
        const data = await contract.getPriceToken(value);
        console.log(ethers.utils.formatUnits(data, 8))
        const price = Number(ethers.utils.formatUnits(data, 8));
        setSelectedTokenPrice(price);
        setLoading(false);
      }
    } catch (error) {
      ErrorHandling(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSelectToken('vex');
  }, [])

  return (
    <SortSelect 
      placeholder="Select a token"
      defaultValue="vex"
      style={{ width: '40%' }}
      dropdownStyle={{
        color: '#fff',
        backgroundColor: '#1c274f',
      }}
      onChange={handleSelectToken}
    >
      <SortOption value="vex">
        <img src={vex} alt='vex' width='24' />
        <span style={{marginLeft: '10px', color: '#fff'}}>VEX</span>
      </SortOption>
    </SortSelect>
  )
}
