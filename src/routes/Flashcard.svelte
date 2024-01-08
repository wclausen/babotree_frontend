<script lang='ts'>
    import { Card, Button } from 'flowbite-svelte';
    export let flashcard_id: string;
    export let topic: string;
    export let question: string;
    export let answer: string;

    var showAnswer = false;

    var related_highlights: string[] = [];
    var explanation: string | null = null;

    async function loadRelatedHighlights() {
        // const server_url = 'http://127.0.0.1:8080'
        const server_url = 'https://api.babotree.com'
        const res = await fetch(server_url + `/flashcard/${flashcard_id}/related_highlights`)
        const data = await res.json();
        related_highlights = data.related_highlights;
    }

    async function explainFlaschard() {
        // const server_url = 'http://127.0.0.1:8080'
        const server_url = 'https://api.babotree.com'
        const res = await fetch(server_url + `/flashcard/${flashcard_id}/explain`)
        const data = await res.json();
        explanation = data.explanation;
    }
</script>

<Card class="h-full flex flex-col gap-4 p-4">
    <div class="max-w-xl text-center underline">{topic}</div>
    <div class="max-w-xl text-center">{question}</div>
    <div class="max-w-xl text-center">
        <hr class="{showAnswer ? 'visible' : 'invisible overflow-hidden'}">
        <div class="{showAnswer ? 'visible' : 'invisible overflow-hidden'} p-4">{answer}</div>
    </div>
    {#if related_highlights.length > 0}
        <div class="max-w-xl">Related Highlights</div>
        <ul class="list-disc">
            {#each related_highlights as related_highlight}
                <li class="max-w-xl">{related_highlight}</li>
            {/each}
        </ul>
    {/if}
    {#if explanation}
        <div class="max-w-xl">Explanation</div>
        <div class="max-w-xl">{explanation}</div>
    {/if}
    <div class="flex justify-end gap-4">
        <Button outline on:click={() => showAnswer = !showAnswer}>Show Answer</Button>
        {#if showAnswer}
            <Button outline on:click={loadRelatedHighlights}>Load Related Highlights</Button>
            <Button outline on:click={explainFlaschard}>Explain</Button>
        {/if}
    </div>
</Card>