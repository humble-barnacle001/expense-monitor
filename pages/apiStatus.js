const Page = ({ data, ts }) => {
    return (
        <div className='text-center container m-auto'>
            <h1 className='p-10'>API Status</h1>
            <p
                className={`text-${data ? "success" : "danger"}`}
                suppressHydrationWarning
            >
                {data ? `${data} ${new Date(ts)}` : "API Error"}!!
            </p>
        </div>
    );
};

// This gets called on every request
export async function getServerSideProps(Context) {
    return {
        props: {
            data: `API up and running at`,
            ts: new Date().getTime(),
        },
    };
}

export default Page;
