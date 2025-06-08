

1
Implement the Details Page

2
Step 1: Implement DetailsPage Component

3
Step 2: Style DetailsPage Component

4
Step 3: Push Changes to GitHub

5
Step 4: Evidence and Final Solution
Step 4: Evidence and Final Solution
Ensure your final solution is correctly implemented and ready for submission. This part of the lab requires you to present your completed work.

Final Solution
Your DetailsPage.js should now fetch and display the details of a gift dynamically from the backend API, and DetailsPage.css should style the details page according to the tasks outlined.

Click here for DetailsPage.js
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailsPage.css';
import {urlConfig} from '../../config';
function DetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const authenticationToken = sessionStorage.getItem('auth-token');
        if (!authenticationToken) {
            // Task 1: Check for authentication and redirect
            navigate('/app/login');
        }
        // get the gift to be rendered on the details page
        const fetchGift = async () => {
            try {
                // Task 2: Fetch gift details
                const url = `${urlConfig.backendUrl}/api/gifts/${productId}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGift(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchGift();
        // Task 3: Scroll to top on component mount
        window.scrollTo(0, 0);
    }, [productId, navigate]);
    const handleBackClick = () => {
        // Task 4: Handle back click
        navigate(-1);
    };
    //The comments have been hardcoded for this project.
    const comments = [
        {
            author: "John Doe",
            comment: "I would like this!"
        },
        {
            author: "Jane Smith",
            comment: "Just DMed you."
        },
        {
            author: "Alice Johnson",
            comment: "I will take it if it's still available."
        },
        {
            author: "Mike Brown",
            comment: "This is a good one!"
        },
        {
            author: "Sarah Wilson",
            comment: "My family can use one. DM me if it is still available. Thank you!"
        }
    ];
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!gift) return <div>Gift not found</div>;
    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back</button>
            <div className="card product-details-card">
                <div className="card-header text-white">
                    <h2 className="details-title">{gift.name}</h2>
                </div>
                <div className="card-body">
                    <div className="image-placeholder-large">
                        {gift.image ? (
                            // Task 5: Display gift image
                            <img src={gift.image} alt={gift.name} className="product-image-large" />
                        ) : (
                            <div className="no-image-available-large">No Image Available</div>
                        )}
                    </div>
                    {/* Task 6: Display gift details */}
                    <p><strong>Category:</strong> 
                        {gift.category}
                    </p>
                    <p><strong>Condition:</strong> 
                        {gift.condition}
                    </p>
                    <p><strong>Date Added:</strong> 
                        {gift.dateAdded}
                    </p>
                    <p><strong>Age (Years):</strong> 
                        {gift.age}
                    </p>
                    <p><strong>Description:</strong> 
                        {gift.description}
                    </p>
                </div>
            </div>
            <div className="comments-section mt-4">
                <h3 className="mb-3">Comments</h3>
                {/* Task 7: Render comments section */}
                {comments.map((comment, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
                            <p className="comment-author"><strong>{comment.author}:</strong></p>
                            <p className="comment-text">{comment.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DetailsPage;


