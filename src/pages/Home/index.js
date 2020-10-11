import React, { Component } from 'react';
import Radium from 'radium';
import axios from 'axios';

import variables from '../../assets/variables';
import logout from '../../assets/images/icn-logout.svg';
import NavItem from '../../components/NavItem';
import Input from '../../components/Input';
import { backend_env } from '../../config/config';
import {Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css';
import { register_product_form } from '../../forms/RegisterProductForm';


export default class Home extends Component {

    navList = ['Profile', 'Products']

    constructor(props) {
        super(props)
        this.state = {
            activeTitle: 'Profile',
            category: '',
            categoryTitle: '',
            searchInput: '',
            filterList: {},
            products: [],
            isRegister: false,
            title: '',
            desc: '',
            max_bid_amount: 0,
            min_bid_amount: 0,
            expiry: '',
            currentuser: '',
            bids: []
        }

        this.handleChanges = this.handleChanges.bind(this)
        this.addFilter = this.addFilter.bind(this)
    }

    componentDidMount() {

        this.setState({filterList: this.filters})

        this.getProducts()
        this.getCurrentUser()
        console.log(backend_env)
    }

    handleChanges(event) {
        let target = event.target
        let value = target.value
        let name = target.name

        this.setState({[name] : value})
    }

    addFilter(filter) {
        let newObj = this.state.filterList
        newObj[filter.category] = filter.searchInput

        this.setState({filterList: newObj})
    }

    navCallback = (title) => {
        this.setState({activeTitle: title})
    }

    customSelectCallback = (selected) => {
        
        if(selected == '') {
            this.setState({searchInput: ''})
            this.setState({category: ''})
        } else {
            this.setState({category: selected.value})
            this.setState({categoryTitle: selected.label})
            this.setState({searchInput: ''})
        }

    }

    removeFromFilterListCallback = (filterCategory) => {
        console.log(filterCategory)
        let newObj = this.state.filterList
        newObj[filterCategory] = ''

        this.setState({filterList: newObj})
    }

    inputCallback = (input) => {
        console.log(input)
        this.setState({ [input.name]: input.value });
    }

    getCurrentUser() {
        axios.get(backend_env + '/api/user/currentuser')
        .then( res => {
            this.setState({currentuser: res.data})
            console.log(res.data)
        })
        .catch(err => {
            this.props.history.push("/login")
            throw err
        })
    }

    getBids = (productId) =>{
        this.setState({viewBid: true})
        axios.get(backend_env + '/api/products/bids/' + productId
        )
        .then( res => {
            this.setState({bids: res.data})
            console.log(res)
        })
    }

    getProducts() {
        axios.get(backend_env + '/api/products/')
        .then( res => {
            console.log(res.data[0]);
            this.setState({products: res.data})
        })
    }

    selectProduct(id) {
        const product = {
            product_id: id,
            user_id: this.state.currentuser
        }
        axios.post(backend_env + '/api/products', {product})
        .then( res => {
            console.log(res);
        })
    }

    logout() {
        axios.delete(backend_env + '/api/user/logout')
        .then( res => {
            this.props.history.push("/login")
        })
    }


    register() {
        if(this.state.title &&
            this.state.desc &&
            this.state.max_bid_amount &&
            this.state.min_bid_amount &&
            this.state.expiry) {
                const product = {
                    title: this.state.title,
                    desc: this.state.desc,
                    max_bid_amount: this.state.max_bid_amount,
                    min_bid_amount: this.state.min_bid_amount,
                    expiry: this.state.expiry,
                    createdBy: this.state.currentuser.id
                    };
        
                axios.post(backend_env + '/api/products', 
                {product},{
                    header: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
                .then(res => {
                    console.log(res);
                })
        } else {
            console.log('false')
        }
    }

    render() {
        return(
            <div style={styles(null, null).page}>
                <div style={styles().pageWrapper}>
                    <div style={styles().navWrapper}>
                        <div style={styles().navList}>
                            {this.navList.map((title) => (
                                <NavItem key={title} title={title} activeTitle={this.state.activeTitle} setActiveTitle={this.navCallback} />
                            ))}
                        </div>
                        <div style={styles().logoutBtnWrapper} onClick={() => this.logout()}>
                            <img style={styles().logoutBtnImg} src={logout}></img>
                            <p style={styles().logoutBtnText}>logout</p>
                        </div>
                    </div>
                    <div style={styles().contentWrapper}>
                            {(this.state.activeTitle === 'Profile' && !this.state.isRegister && !this.state.viewBid) && 
                            <div style={styles().profileWrapper}>
                                <div>
                                    <p style={styles().profileText}><span style={styles().profileTitle}>Name: </span>{this.state.currentuser?.name}</p>
                                    <p style={styles().profileText}><span style={styles().profileTitle}>Email: </span>{this.state.currentuser?.email}</p>
                                    <p style={styles().profileText}><span style={styles().profileTitle}>Bid credit: </span>{this.state.currentuser?.bid_credit}</p>
                                    <p style={styles().profileText}><span style={styles().profileTitle}>Committed bid credit: </span>{this.state.currentuser?.committed_bid_credit}</p>
                                    <h2>My Products</h2>
                                    <Table
                                        width={1000}
                                        height={300}
                                        headerHeight={20}
                                        rowHeight={30}
                                        rowCount={this.state.products.length}
                                        rowGetter={({index}) => this.state.products[index]}
                                        onRowClick={({index}) => this.getBids(index + 1)}>
                                        <Column label="Title" dataKey="title" width={200} />
                                        <Column label="Description" dataKey="desc" width={200} />
                                        <Column label="Max Bid" dataKey="max_bid_amount" width={200} />
                                        <Column label="Min Bid" dataKey="min_bid_amount" width={200} />
                                        <Column label="Expiry Date" dataKey="expiry" width={200} />
                                        <Column label="Is available" dataKey="is_available" width={100} />
                                        <Column label="Sold to" dataKey="sold_to" width={100} />
                                    </Table>

                                    <button onClick = {() => this.setState({isRegister: true})} style={styles().addProductBtn}>add product</button>                                      
                                </div>
                            </div>}
                            {(this.state.activeTitle === 'Profile' && this.state.isRegister && !this.state.viewBid) && 
                            <div style={styles().registerProductCard}>
                                <h2>Register Product</h2>
                                {register_product_form.map((field) => {
                                    return(
                                        <Input fieldName={field.name} 
                                                inputType={field.inputType} 
                                                inputLabel={field.inputLabel}
                                                inputCallback={this.inputCallback}/>
                                    )
                                })}
                                <button style={styles().addProductBtn} onClick = {() => this.register()}>Submit</button>
                                <button onClick = {() => this.setState({isRegister: false})} style={styles().addProductBtn}>Cancel</button>
                            </div>}
                            {(this.state.activeTitle === 'Profile'&& !this.state.isRegister && this.state.viewBid) && 
                            <div style={styles().profileWrapper}>
                                <h2>View Bids</h2>
                                <p>click row to select bid</p>
                                    <Table
                                        width={1000}
                                        height={300}
                                        headerHeight={20}
                                        rowHeight={30}
                                        rowCount={this.state.bids.length}
                                        rowGetter={({index}) => this.state.bids[index]}
                                        onRowClick={({index}) => this.selectProduct(this.state.bids[index].id)}>
                                        <Column label="Amount" dataKey="bid_amount" width={200} />
                                        <Column label="User Id" dataKey="created_by" width={200} />
                                        <Column label="Created at" dataKey="created_at" width={200} />
                                    </Table>
                                {/* <button style={styles().addProductBtn} onClick = {() => this.register()}>Select Bid</button> */}
                                <button onClick = {() => this.setState({viewBid: false})} style={styles().addProductBtn}>Cancel</button>
                            </div>}
                        {/* <DataTable userList={this.state.users}/> */}
                    </div>
                </div>
                
            </div>
        );
    }
}

Home = Radium(Home)

let styles = (url, isDisabled) => ({
    page: {
        fontFamily: '"Montserrat", sans-serif',
        backgroundColor: variables.white2,
        // backgroundImage: 'url('+url+')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        top: 0,
        left: 0,
        minHeight: '100vh',
        minWidth: '100%',
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
    },
    pageWrapper: {
        display: 'flex'
    },
    navWrapper: {
        width: 300,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: variables.blue1,
        // marginTop: 45,
        borderRadius: 5
    },
    logoWrapper: {
        marginLeft: 50
    }, 
    logo: {
        width: 200,
        height: 'auto'
    },
    navList: {
        // marginTop: 45,
    },
    logoutBtnWrapper: {
        bottom: 0,
        position: 'fixed',
        marginLeft: 25,
        marginBottom: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    logoutBtnImg: {
        width: 15,
        height: 15,
        marginTop: 2
    },
    logoutBtnText: {
        fontSize: 15,
        margin: '0 0 0 4px'
    },
    contentWrapper: {
        backgroundColor: variables.white3,
        width: '100%',
        height: '100vh',
        padding: '15px 40px',
    },
    searchField: {
        fontFamily: '"Montserrat", sans-serif',
        borderRadius: 17,
        border: 0,
        fontWeight: '500',
        color: variables.black2,
        backgroundColor: variables.white1,
        boxShadow: "2px 4px 10px rgba(225, 225, 225, 1)",
        fontSize: 13, 
        padding: '10px 30px 10px 30px',
        width: 140,
        marginLeft: 15,
        opacity: isDisabled == true ? 0.5 : 1.0,
        ':focus': {
            color: variables.black2,
            outline: 0,
        },
    },
    searchButton: {
        marginLeft: 15,
        borderRadius: 17,
        border: 0,
        fontWeight: '500',
        color: variables.white1,
        backgroundColor: variables.black2,
        boxShadow: "2px 4px 10px rgba(225, 225, 225, 1)",
        fontSize: 13, 
        padding: '10px 30px 10px 30px',
        opacity: isDisabled == true ? 0.5 : 1.0,
        ':focus': {
            outline: 0,
        },
        ':active': {
            opacity: 0.7,
        },
    },
    filtersWrapper: {
        marginTop: 24,
        display: 'flex',
        flexWrap: 'wrap'
    },
    profileWrapper: {
        height: '100%',
        width: '100%',
        backgroundColor: variables.gray6,
        borderRadius: 10,
        padding: 25
    },
    profileText: {
        color: variables.black2,
    },
    profileTitle: {
        fontWeight: 'bold'
    },
    addProductBtn: {
        backgroundColor: variables.black1,
        color: variables.white3,
        borderRadius: 10,
        marginTop: 25,
        border: 0,
        padding: 10
    },registerProductCard: {
        paddingTop: 48,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
})
