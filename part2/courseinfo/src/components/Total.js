const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, current) => accumulator + current.exercises, 0);
  return (
    <strong>Total of exercises {total} </strong>
  );
};

export default Total;