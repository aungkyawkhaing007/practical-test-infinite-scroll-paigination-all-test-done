import { Suspense, lazy, ElementType, Component } from "react";
import LoadingSpinner from "../components/Uielement/LoadingSpinner";

// loading screen

const Loadable = (Component: ElementType) => (props: any) =>
(
    <Suspense fallback={<LoadingSpinner/>}>
        <Component {...props} />
    </Suspense>
);

export const  Market = Loadable(
    
    lazy(() =>import('../pages/MarketPlace'))
);