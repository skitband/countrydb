
const Countries = ({ currentItems, selectCountry }) => {

  const handleOnClick = (name) => {
    selectCountry(name);
  }

  return (
    <>
      <h4 className="my-1">Countries List</h4>
      {currentItems &&
        currentItems.map((item, index) => (
            <a key={index} href="#" className="list-group-item list-group-item-action lh-sm fw-semibold border-0 bg-container p-0" aria-current="true" onClick={() => { handleOnClick(item.name.official) }}>
              {item.name.official}
            </a>
        ))}
    </>
  )
}

export default Countries