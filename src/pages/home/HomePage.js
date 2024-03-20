import BikeList from "../../components/bikeCards/BikeCards";

const HomePage = () => {
    return (
        <>
            <main>
                <section>
                    <div className="wellcome">
                        <div className="wellcomeMsg">
                            <div className="headTag">Sushi</div>
                            <div className="subTag">
                                Sushi
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