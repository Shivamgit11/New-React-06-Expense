const ExpenseItem = (props) => {
  const { amount, description, category } = props.item;

  return (
    <li key={Math.random()}>
      <span>{amount}</span>
      <span>{description}</span>
      <span>{category}</span>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
