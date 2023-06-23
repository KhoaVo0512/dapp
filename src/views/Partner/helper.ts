export const rolePartner = [
    {id:0,value:"Non Role"},
    {id:1,value:"Non Role"},
    {id:2,value:"Collaborator"},
    {id:3,value:"Team Leader"},
    {id:4,value: "Club"},
    {id:5,value: "Premium"},
    {id:6,value:"Region"},
    {id:7,value:"Country"},
]
export const definePartner = (role)=>{
    const index = rolePartner.find(object => object.id === role);
    const val = index?.value;
    return val
}