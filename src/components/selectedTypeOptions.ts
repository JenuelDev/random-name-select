const selectedTypesOptions = [
    {
        label: "Anime",
        value: "anime",
    },
    {
        label: "KDrama addict",
        value: "k_drama_addict",
    },
    {
        label: "Romantic Person",
        value: "romantic_person",
    },
    {
        label: "Gymnastic",
        value: "gymnastic",
    },
    {
        label: "Hacker",
        value: "hacker",
    },
    {
        label: "The Gamer",
        value: "the_gamer",
    },
];

export const soundPlay = (value: string) => {
    return "this-audio";
};

export default selectedTypesOptions
    .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0))
    .map((item) => ({ label: item.label, value: item.value }));
