const CountryListItem = ({country, onClick}) => {
    return (
      <div>
        <div>{country.name.common}</div>
        <button onClick={()=>onClick(country)} >Show</button>
      </div>
    )
  }

export default CountryListItem