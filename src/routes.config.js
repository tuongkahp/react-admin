// export routes = () => {
//   let element = useRoutes([
//     // These are the same as the props you provide to <Route>
//     { path: "/", element: <Home /> },
//     { path: "dashboard", element: <Dashboard /> },
//     {
//       path: "invoices",
//       element: <Invoices />,
//       // Nested routes use a children property, which is also
//       // the same as <Route>
//       children: [
//         { path: ":id", element: <Invoice /> },
//         { path: "sent", element: <SentInvoices /> },
//       ],
//     },
//     // Not found routes work as you'd expect
//     { path: "*", element: <NotFound /> },
//   ]);
// }