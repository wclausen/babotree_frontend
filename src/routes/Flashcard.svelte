<script lang='ts'>
    import { Card, Button } from 'flowbite-svelte';
    export let flashcard_id: string;
    export let topic: string;
    export let question: string;
    export let answer: string;

    var showAnswer = false;

    var related_highlights: string[] = [];

    async function loadRelatedHighlights() {
        // const server_url = 'http://127.0.0.1:8080'
        const server_url = 'https://api.babotree.com'
        const res = await fetch(server_url + `/flashcard/${flashcard_id}/related_highlights`)
        const data = await res.json();
        related_highlights = data.related_highlights;
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
    <div class="flex justify-end">
        <Button outline on:click={() => showAnswer = !showAnswer}>Show Answer</Button>
        {#if showAnswer}
            <Button outline on:click={loadRelatedHighlights}>Load Related Highlights</Button>
        {/if}
    </div>
</Card>