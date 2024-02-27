import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Backbutton() {
    const LinkStyled = styled(Link)`
    text-decoration: none;
    color: black;
    }`;

    const [breadcrumb, setBreadcrumb] = useState("");

    function popularBreadCrumb(rota: string) {
        setBreadcrumb(rota);
    }

    return (
        <div className="row">
            <LinkStyled to={breadcrumb} className="m-2 text-dark">{breadcrumb}</LinkStyled>
        </div>
    )
}