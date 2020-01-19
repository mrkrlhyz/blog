import sys
import re
import os

"""
To improve:
- refactor code for parsing arguments (use library)
- add argument for most recent post

* Fix stripping function. Should only take the symbols from the paragraph where the cut belongs
"""

global sandwich
sandwich = ['*', '_', '~', '#']

''' Takes the Markdown formatter symbols for enclosing text before excerptizing '''
def strip_format(text):
    symbols = ''
    for chars in text:
        if chars in sandwich:
            symbols += chars
    print(symbols)
    # return reversed
    return symbols[::-1]

def parse_args(t):
    symbols = ['\"', '\'', ' ']
    if len(t):
        title = t
        for s in symbols:
            title = title.replace(s, '-')

        return title

    else:
        print("Invalid title.")

def parse_title(t):
    title = t.replace('-', '')
    return title

''' Excerptizes post/s '''
def excerptize(file):
    try:
        with open(file, 'r+') as post:
            content = post.read()
            # print(content)
            front_matter = ''
            if "<!-- more -->" not in content:
                front_matter = ''
                string = '---'
                for x in range(2):
                    i = content.find(string)
                    j = i + len(string)
                    front_matter += content[:j]
                    content = content[j:]
            else: 
                print("File already excerpt-ized. Exiting.")
                exit
        if "<!-- more -->" not in content:
            c = content
            c = c.split(' ')
            output = ''
            if len(c) >= 91:
                # check for any formatting elements in the beginning of the paragraph
                if any([i in c[0].lstrip() for i in sandwich]):
                    symbols = strip_format(c[0].lstrip())
                    output = ' '.join(c[:90] + [c[90].rstrip()])
                    output += symbols
                    output += ' <!-- more --> '
                    output += symbols[::-1]
                    output += ' '.join(c[91:])
    
                else:
                    output = ' '.join(c[:91] + ['<!-- more -->'] + c[91:])
                # print("output:", output)
                output = front_matter + output
            
                with open(file, 'w') as post:
                    if len(output):
                        post.write(output)

                print("Finished.")

            else:
                print("No need to excerptize file. Exiting.")
                exit

    except Exception as e:
        print(e)


if __name__  == '__main__':
    if sys.argv[-1] != 'all':
        # parse argument, remove symbols
        file = 'source/_posts/' + parse_args(sys.argv[-1]) + '.md'
        if os.path.isfile(file):
            print("Excerptizing %s ..." % file)
            excerptize(file)
        else:
            f = ' '.join(sys.argv[1:])
            file = 'source/_posts/' + parse_args(f) + '.md'
            if os.path.isfile(file):
                print("Excerptizing %s ..." % file)
                excerptize(file)
            else:
                print("%s is not a valid filename." % file)
                exit
    else:
        for name in os.listdir('source/_posts'):
            file = 'source/_posts/' + name
            if os.path.isfile(file):
                print("Excerptizing %s ..." % file)
                excerptize(file)
                
            else:
                print("%s is not a valid filename." % file)
                exit


    