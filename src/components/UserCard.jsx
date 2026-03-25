const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={user.photoUrl} alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-md font-bold capitalize">
          {user?.firstName + " " + user?.lastName}
        </h2>

        <p className="text-gray-600">
          {user.age && (
            <span className="text-xs font-bold">
              {user.age + " years" + (user.gender && ", ")}
            </span>
          )}
          {user.gender && (
            <span className="text-xs font-bold capitalize">{user.gender}</span>
          )}
        </p>

        <p className="text-gray-600">{user.about}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-ghost">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
