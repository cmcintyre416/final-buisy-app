import React from 'react';
import AddBusinessCard from './AddBusinessCard.js';
import FormatBusinessCard from './FormatBusinessCard.js';
import * as Scroll from 'react-scroll';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class MainView extends React.Component {
    constructor() {
        super();

        this.state = {
            savedCards: [],
            search: ''
        }
        this.getBusinessCardPayload = this.getBusinessCardPayload.bind(this);
        this.removeBusinessCard = this.removeBusinessCard.bind(this);
        this.toggleCreateBusinessCard = this.toggleCreateBusinessCard.bind(this);
        this.closeCreateBusinessCard = this.closeCreateBusinessCard.bind(this);
        this.submitCardSearch = this.submitCardSearch.bind(this);
    }

    componentDidMount() {
        firebase.database().ref().on('value', (res) => {
            const userData = res.val();
            const dataArray = [];
            for (let objKey in userData) {
                userData[objKey].key = objKey;
                dataArray.push(userData[objKey])
            }
            this.setState({
                savedCards: dataArray
            })
        });
    }

    getBusinessCardPayload(cardPayload) {

        const dbRef = firebase.database().ref();

        const newCardInfo = cardPayload;

        dbRef.push(newCardInfo);
    }

    removeBusinessCard(cardID) {
        const dbRef = firebase.database().ref(cardID);
        dbRef.remove();
    }

    handleChange(e) {
        console.log(e);
    }

    submitCardSearch() {
        this.setState ({
            search: document.getElementById('searchBar').value
        })

        if (this.state.search === "JORDAN") {
            console.log('sweet');
        }
    }

    toggleCreateBusinessCard() {
        this.sideBar.classList.add("slide-in"); 
        this.sideBar.classList.remove("slide-out");
    }

    closeCreateBusinessCard() {
        this.sideBar.classList.remove("slide-in");
        this.sideBar.classList.add("slide-out");
    }

    render() {
        // let filteredCards = this.state.savedCards.name
        let filteredCards = this.state.savedCards.filter(
            (cards) => {
                return cards.name.indexOf(this.state.searchBar) !== -1;
            }
        );
        return (
            <div>
            {/* <div className="wrapper"> */}
                <div className="mainView">
                    <h1>Buisy</h1>
                    <h2>Your Digital Buisiness Card Wallet</h2>
                    <button className="mainView__button" onClick={() => this.toggleCreateBusinessCard()}>
                        Add New Business Card
                    </button>
                </div>
            {/* </div> */}
                <div className="sideBar" ref={ref => this.sideBar = ref}>
                    < AddBusinessCard
                        getBusinessCardPayload={this.getBusinessCardPayload}
                        closeCreateBusinessCard={this.closeCreateBusinessCard}
                    />
                </div>
                <div className="formatCard__wrapper">
                    <div className="search__wrapper">
                        <input onChange={(e) => this.handleChange(e.target.value)} id="searchBar" type="search" placeholder="Find Someone"/>
                        <button onClick={this.submitCardSearch}>Search</button>
                    </div>
                    <div className="formatCard__scrollThrough">
                        {this.state.savedCards.map((card, i) => {
                            return (
                                <div>
                                    < FormatBusinessCard
                                        card={card}
                                        key={`card-${i}`}
                                        remove={this.removeBusinessCard}
                                        cardIndex={i}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainView;