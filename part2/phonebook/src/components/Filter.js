const Filter = ({ searchName, setSerachName }) => {
  return (
    <div>
      Filter shown with: <input value={searchName} onChange={setSerachName} />
    </div>
  );
};

export default Filter;