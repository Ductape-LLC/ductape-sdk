export const extractStages = (input: string): Array<string> => {
    const matches = input.match(/\{(.*?)\}/g); // Regular expression to match all occurrences of text within {}
    return matches ? matches.map(match => match.slice(1, -1)) : []; // Return the captured substrings excluding the brackets   
}