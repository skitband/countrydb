
const Countries = ({ currentItems, selectCountry }) => {

  const handleOnClick = (name) => {
    selectCountry(name);
  }

  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
            <a key={index} href="#" className="list-group-item list-group-item-action py-1 lh-sm fw-semibold" aria-current="true" onClick={() => { handleOnClick(item.name.official) }}>
              {item.name.official}
            </a>
        ))}
    </>
  )
}

export default Countries