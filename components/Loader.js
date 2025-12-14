import Spinner from "../img/Spinner.svg";
import Image from "next/image";

const Loader = () => (
    <div className='text-center'>
        <Image src={Spinner} alt='Loading....' className='img-fluid' />
    </div>
);

export default Loader;
