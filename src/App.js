import "./App.css";
import Login from "./Components/Login.jsx";
import { Routes, Route, Link } from "react-router-dom";
import AboutUs from "./Components/AboutUs.jsx";
import AddItem from "./Components/AddItem";
import Report from "./Components/Report";
import AddUser from "./Components/AddUser";
import SearchTransaction from "./Components/SearchTransaction";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { Authenticator, View, Text, useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import DataEntryPage from "./Components/DataEntryPage.jsx";
import EditItem from "./Components/EditItem";
import Log from "./Components/Log";

Amplify.configure(awsconfig);
const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          BIRKENTECH ACCOUNTING SYSTEM
        </Text>
      </View>
    );
  },
};
function App() {
  return (
    <>
      <Authenticator hideSignUp={true} components={components}>
        {({ signOut, user }) => (
          <div className="App">
            <Routes>
              <Route path="" element={<Login />} />
              <Route path="/home" element={<Login />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/addItem" element={<AddItem />} />
              <Route path="/report" element={<Report />} />
              <Route path="/manageUser" element={<Log />} />
              <Route path="/addUser" element={<AddUser />} />
              <Route path="/searchItem" element={<SearchTransaction />} />
              <Route path="/DataEntryPage/:id" element={<DataEntryPage />} />
              <Route path="/editItem/:id" element={<EditItem />} />
            </Routes>
          </div>
        )}
      </Authenticator>
    </>
  );
}

export default App;
