import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import WithLibraryDatatable from "../views/withLibraryDatatable/index";
import WithoutLibraryDatatable from "../views/withoutLibraryDatatable/index";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="with-datatable" element={<WithLibraryDatatable />} />
            <Route path="without-datatable" element={<WithoutLibraryDatatable />} />
        </Routes>
    )
}

export default Router