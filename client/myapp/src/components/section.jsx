import Box from "@mui/material/Box";



export default function SecitonDivision({children,title,color}) {
    return(
        <>
            <div className="mx-4 my-4 border p-3 shadow-sm rounded">
                <Box component={'section'} sx={{p:'2'}}>
                    <h5 className={"p-2 text-light rounded bg-"+color}>{title}</h5>
                    <div>
                        {children}
                    </div>
                </Box>
            </div>
        </>
    )  
}