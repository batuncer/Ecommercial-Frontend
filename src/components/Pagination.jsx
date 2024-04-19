import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({ pageCount, handlePageClick }) {
    const [active, setActive] = React.useState(1);

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => {
            setActive(index);
            handlePageClick({ selected: index - 1 });
        },
        className: "rounded-full",
    });

    const next = () => {
        if (active === pageCount) return;
        setActive(active + 1);
        handlePageClick({ selected: active });
    };

    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        handlePageClick({ selected: active - 2 });
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }, (_, i) => (
                    <IconButton key={i + 1} {...getItemProps(i + 1)}>
                        {i + 1}
                    </IconButton>
                ))}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={next}
                disabled={active === pageCount}
            >
                Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}
