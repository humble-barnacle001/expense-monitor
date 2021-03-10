const Page = ({ data }) => {
    return (
        <div className='text-center container m-auto'>
            <h1 className='p-10'>API Status</h1>
            <p className={`text-${data ? "success" : "danger"}`}>
                {data ? data : "API Error"}!!
            </p>
        </div>
    );
};

// This gets called on every request
export async function getServerSideProps(Context) {
    return {
        props: {
            data: `API up and running at ${new Date().toLocaleString("en-IN", {
                dateStyle: "long",
                timeStyle: "short",
                hour12: true
            })}`
        }
    };
}

export default Page;
