# YozmaTech
1. What is the usage of Angular's Dependency Injection system, and how does it
enhance modularity in an application? What are the different injection options?

DI allows for inversion of control by passing instances of requested dependencies to the class instead of creating them inside the class

Enhancing Modularity:
-Reusability: Services can be easily reused across different components. 
-Decoupling Components: DI enables components to be independent of their dependencies. Rather than creating dependencies within the component, they are injected minimizing tight coupling.
-Maintainability: DI allows you to change dependencies without altering the components, promoting cleaner and more maintainable code
-Dependency Injection enables Configuration Management by permitting configuration at various levels such as component, module, or root. This provides improved control over the lifecycle and scope of services

Different injection options:
Component Level Injection: This is used when a service is specific to a component and should not be shared with other components. The service is provided in the providers array of the @Component decorator.

Module Level Injection: This is used when a service should be shared among all the components of a module. The service is provided in the providers array of the @NgModule decorator.

Root Level Injection: This is used when a service should be shared among all the components of the application. The service is provided in the providers array of the root module or it can be provided in the @Injectable decorator with providedIn: 'root'.

Hierarchical Injection: This is used when a service should be shared among a component and its children, but not with other components. The service is provided in the providers array of the parent component's decorator.
_____________________________________________________________________________________________________________________________

2. Given a table called users with columns `id`, `name`, `email`, and `created_at`,
write a query to find the top 10 users who have been recently created.
Describe how you would optimize this query if the table grows to over 1M
records.

SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;

If the users table grows to over 1 million records, there are several ways to optimize this query:

Index the created_at column: By creating an index on the created_at column, the database can more quickly find the most recently created users.

Use a covering index: A covering index is an index that includes all the columns used in a query. In this case, you could create a covering index on the created_at, id, name, and email columns. This would allow the database to retrieve all the necessary data from the index itself, without having to access the actual table data.

Partition the table: partitioning large tables into smaller, more manageable pieces. 

Use a cache: caching the results to reduce the load on the database. This could be done using a caching layer such as Redis
_____________________________________________________________________________________________________________________________

3. Explain the different categories of HTTP status codes and provide examples of
status codes that fall under each category.

**Informational Responses (1**)**
These status codes indicate that the request has been received and understood and that the client should continue with the request or ignore it if it is already finished.
    100 Continue: This code indicates that the initial part of a request has been received and the client should continue with the request or ignore it if it is already finished.

**Successful Responses (2**)**
These status codes indicate that the request was successfully received, understood, and accepted.
200 OK: The request has succeeded. The meaning of the success depends on the HTTP method:
GET: The resource has been fetched and transmitted in the message body.
POST: The resource describing the result of the action is transmitted in the message body.

**Redirection Messages (3**)**
These status codes indicate that further action needs to be taken by the user agent to fulfill the request.
    301 Moved Permanently: This response code means that the URI of the requested resource has been changed permanently.
    302 Found: This code indicates that the URI of the requested resource has been changed temporarily.

**Client Error Responses (4**)**
These status codes indicate that the client seems to have made an error.
    400 Bad Request: This code indicates that the server could not understand the request due to invalid syntax.
    401 Unauthorized: This code indicates that the client must authenticate itself to get the requested response.
    403 Forbidden: The client does not have access rights to the content; that is, it is unauthorized.
    404 Not Found: The server cannot find the requested resource.

**Server Error Responses (5**)**
These status codes indicate that the server failed to fulfill a valid request.
500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
503 Service Unavailable: The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.
_____________________________________________________________________________________________________________________________

4. Write a query resulting in the count of orders placed by each user in the past
month, with the total amount spent by each user - only for VIP users, meaning,
only for users with more than 5 orders.
Include the user’s name, email, order count, and total spent amount, and order
the results by the big spender in descending order

WITH recent_orders AS (
    SELECT 
        user_id, 
        COUNT(*) AS order_count, 
        SUM(amount) AS total_spent
    FROM 
        orders
    WHERE 
        order_date >= NOW() - INTERVAL '1 month'
    GROUP BY 
        user_id
    HAVING 
        COUNT(*) > 5
)
SELECT 
    u.name, 
    u.email, 
    ro.order_count, 
    ro.total_spent
FROM 
    recent_orders ro
JOIN 
    users u ON u.id = ro.user_id
ORDER BY 
    ro.total_spent DESC;
