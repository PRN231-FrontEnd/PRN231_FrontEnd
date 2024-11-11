import { useEffect, useState } from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { Link, useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function ProfilePage() {
    const { id } = useParams(); // Get user ID from the URL
    const [userData, setUserData] = useState(null);
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Fetch user data from the API
        fetch(`https://flowerexchange.azurewebsites.net/api/account/user-id/${id}`)
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error("Error fetching user data:", error));
    }, [id]);

    useEffect(() => {
        // Fetch purchased products with pagination from the API
        fetch(`https://flowerexchange.azurewebsites.net/api/flower-order/${id}/user`)
            .then((response) => response.json())
            .then((data) => setPurchasedProducts(data))
            .catch((error) => console.error("Error fetching purchased products:", error));
    }, [id, currentPage]);


    if (!userData) return <p>Loading...</p>;

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                {/* Breadcrumb */}
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem><a href="#">Home</a></MDBBreadcrumbItem>
                            <MDBBreadcrumbItem><a href="#">User</a></MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                {/* User Profile Info */}
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={userData.profilePictureUrl || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid
                                />
                                <p className="text-muted mb-1">Role: {userData.roles[0]}</p>
                                <p className="text-muted mb-4">{userData.statusDisplayName}</p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userData.fullname}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userData.phoneNumber}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Last Login</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{new Date(userData.lastLogin).toLocaleString()}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                {/* Purchased Products Table */}
                <MDBRow className="mt-4">
                    <MDBCol>
                        <h3>Purchased Products</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID transaction</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Seller/Store</TableCell>
                                        <TableCell>Buy at</TableCell>
                                        <TableCell>Flower post</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {purchasedProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.id}</TableCell>
                                            <TableCell>{product.status}</TableCell>
                                            <TableCell>{product.amount.toLocaleString()} VNĐ</TableCell>
                                            <TableCell>{product.sellerFullName}</TableCell>
                                            <TableCell>{product.createdAt}</TableCell>
                                            <TableCell>
                                                <Link to={`/post-details/${product.flower.postId}`}>
                                                    Click here to see the post
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
