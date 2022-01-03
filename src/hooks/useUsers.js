import { useEffect, useState } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const [pageCount, setPageCount] = useState(0);
  let size = 10;

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://still-island-68728.herokuapp.com/users?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setDisplayUsers(data.users);
        setIsLoading(false);
        const pageNumber = Math.ceil(data.count / size);
        setPageCount(pageNumber);
      });
  }, [page, size, pageCount]);

  const setPageNumber = (number) => setPage(number);

  const setAgeValue = (value) => {
    // setAge(value);

    const minAge = value.split(',')[0];
    const maxAge = value.split(',')[1];

    setDisplayUsers(users.filter(({ age }) => age >= minAge && age <= maxAge));
  };

  const searchFilter = (value) =>
    setDisplayUsers(
      users.filter(
        ({ name, email, phone }) =>
          name.includes(value) || email.includes(value) || phone.includes(value)
      )
    );

  const blockUsers = (userState) => {
    let arrayids = [];
    userState.forEach((d) => {
      fetch('https://still-island-68728.herokuapp.com/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: userState,
          blocked: true,
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (d.select) {
        arrayids.push(d._id);
      }
    });
    console.log(arrayids)
  };

  return {
    users,
    displayUsers,
    isLoading,
    pageCount,
    searchFilter,
    blockUsers,
    page,
    setAgeValue,
    setPageNumber,
  };
};

export default useUsers;
