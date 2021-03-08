import withAuth from "../components/PrivateRoute";

const Home = () => (
    <div className='m-auto'>
        <h1 className='text-center p-10'>Hello!!</h1>
    </div>
);

export default withAuth(Home);
