<script>
    import { Alert, Card, A, Button, Heading, Checkbox } from 'flowbite-svelte';
    import { marked } from 'marked';

let highlights_by_source = [];
let highlight_ids_selected = [];
$: some_highlights_selected = highlight_ids_selected.length > 0;

let book_id_to_summary = {}

async function loadHighlights() {
    // const server_url = 'http://127.0.0.1:8080'
    const server_url = 'https://api.babotree.com'
    const res = await fetch(server_url + '/readwise')
    const data = await res.json()
    highlights_by_source = data.highlights_by_source
}

async function summarizeHighlights(source_id) {
    // const server_url = 'http://127.0.0.1:8080'
    const server_url = 'https://api.babotree.com'
    const res = await fetch(server_url + '/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            source_id: source_id
        })
    })
}

function toggleHighlightIdSelected(highlight_id) {
    if (highlight_ids_selected.includes(highlight_id)) {
        highlight_ids_selected = highlight_ids_selected.filter(id => id !== highlight_id)
    } else {
        highlight_ids_selected = [...highlight_ids_selected, highlight_id]
    }
}

let questions_answers = [];

async function generateQuestionsForSelectedHighlights() {
    // const server_url = 'http://localhost:8080'
    const server_url = 'https://api.babotree.com'
    const res = await fetch(server_url + '/generate_questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            highlight_ids: highlight_ids_selected
        })
    })
    const data = await res.json();
    questions_answers = data.questions_and_answers;
}

let similar_highlights = [];

async function getSimilarHighlights() {
    // const server_url = 'http://localhost:8080'
    const server_url = 'https://api.babotree.com'
    let highlight_ids_param = highlight_ids_selected.join(',');
    let encoded_highlight_ids_param = encodeURIComponent(highlight_ids_param);
    const res = await fetch(server_url + `/similar_highlights?hids=${encoded_highlight_ids_param}`)
    const data = await res.json();
    similar_highlights = data.similar_highlights;
}

</script>

<div class="flex flex-col gap-8 p-8">
    <div class="text-4xl font-medium">Welcome to BaboTree</div>
    <div>
        <Button outline on:click={loadHighlights}>Load Readwise Highlights</Button>
    </div>
    <div class="grid grid-cols-2">
        <div>
            {#each highlights_by_source as source_higlights (source_higlights.id)}
                <div class="m-4">
                    {@debug source_higlights}
                    {#if source_higlights.source_url}
                        <A class="font-medium text-lg underline m-4" href="{source_higlights.source_url ?? ''}" target="_blank"><Heading tag="h2">{source_higlights.book_title}</Heading></A>
                    {:else}
                        <A href="/source/{source_higlights.id}"><Heading tag="h2">{source_higlights.book_title}</Heading></A>
                    {/if}
                    <div class="flex flex-wrap gap-8">
                        {#each source_higlights.highlights as highlight (highlight.id)}
                            <Card>
                                <div on:click={() => toggleHighlightIdSelected(highlight.id)}>
                                    <Checkbox checked={highlight_ids_selected.includes(highlight.id)} on:change={() => toggleHighlightIdSelected(highlight.id)}>Select</Checkbox>
                                    <div class="max-w-xl">{@html marked.parse(highlight.text)}</div>
                                </div>
                            </Card>
                        {/each}
                    </div>
                    <button>Summarize These Notes</button>
                </div>
            {/each}
        </div>
        <div class="flex flex-col gap-4">
            {#each questions_answers as question_answer}
                <Card>
                    <div class="max-w-xl">{question_answer.question}</div>
                    <div class="max-w-xl">{question_answer.answer}</div>
                </Card>
            {/each}
        </div>
    </div>
    {#if some_highlights_selected}
        <div class="fixed inset-x-0 bottom-0 p-4 bg-gray-500/20 bg-opacity-50 backdrop-blur-md flex justify-center">
            <Button on:click={generateQuestionsForSelectedHighlights}>
                Generate Questions
            </Button>
            <Button on:click={getSimilarHighlights}>
                Get similar highlights
            </Button>
        </div>
    {/if}
</div>

<style lang="postcss">
    .fix_link_color a {
        color: #3182ce;
    }
</style>



