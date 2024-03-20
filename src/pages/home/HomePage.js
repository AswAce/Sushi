import BikeList from "../../components/bikeCards/BikeCards";

const HomePage = () => {
    return (
        <>
            <main>
                <section>
                    <div className="wellcome">
                        <div className="wellcomeMsg">
                            <div className="headTag">All Mountain Bike Spot</div>
                            <div className="subTag">
                                All Mountain Bike Spot
                            </div>
                        </div>
                    </div>
                </section>
                <div className="main-wrapper">
                    <div className="wrapper">
                        <section id="shop">
                            <BikeList />
                        </section>
                    </div>
                </div>
                <section className="parallex-section">
                    <div className="parallex" id="parallex-set-3" />
                </section>
            </main>
        </>
    );
}

export default HomePage;