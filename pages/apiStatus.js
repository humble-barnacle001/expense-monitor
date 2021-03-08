const Page = ({ data }) => {
    return (
        <div className='m-auto'>
            <h1 className='text-center p-10'>{data}!!</h1>
        </div>
    );
};

// This gets called on every request
export async function getServerSideProps(Context) {
    // Fetch data
    try {
        const res = await fetch(
            `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
                Context.req.headers.host
            }/api`
        );
        const data = await res.json();

        // Pass data to the page via props
        return { props: { data: data.body.message } };
    } catch (err) {
        console.log(err);
        return { props: { data: "API error" } };
    }
}

export default Page;
