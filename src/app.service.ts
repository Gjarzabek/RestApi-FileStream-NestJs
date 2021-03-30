import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

    private buffer: string = "";
    private phraseToFilter = "@yahoo.com\r";

    private isValidLine(phrase: string): boolean {
        return phrase != "\n" && !phrase.endsWith(this.phraseToFilter);
    }

    // I assume proper CSV format of a given chunk -- every line ended with '\r\n'
    private filterCsv(chunk: string): string {
        var result: string = "";
        let beginId = 0;
        let endlineId = chunk.indexOf('\n');
        
        //Check if we have something left in a buffer from previous chunk
        if (endlineId && this.buffer.length > 0) {
            const retrivedLine = this.buffer + chunk.substring(0, endlineId) ;
            if (this.isValidLine(retrivedLine)) {
                result += retrivedLine + "\n";
            }
            beginId = endlineId + 1;
            this.buffer = "";
        }
        
        //Parse line by line. If the line is not complete save that in a buffer and wait for the rest
        while (endlineId != -1) {
            const currentLine = chunk.substring(beginId, endlineId);
            if (this.isValidLine(currentLine)) {
                result += currentLine + "\n";
            }
            beginId = endlineId + 1;
            endlineId = chunk.indexOf('\n', beginId);
        }

        if (beginId < chunk.length)
            this.buffer = chunk.substring(beginId);

        return result;
    }
    
    public async streamCsv(req: any, res: any) {
        req.on('data', (chunk: any) => {
            const filteredChunk: string = this.filterCsv(chunk.toString());
            if (filteredChunk != "")     res.write(filteredChunk);
        });

        req.on('end', () => {
            console.log("File filtered");
            res.end();
        });
    }

}
