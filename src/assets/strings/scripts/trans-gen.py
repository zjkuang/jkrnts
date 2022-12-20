# pip3 install pyyaml
# In VSCode, Command-Shift-P, "Python: Select interpreter", select the one marked "Global"

# To run, in Terminal,
# $ python3 trans-gen.py

from array import array
from genericpath import isdir
from tabnanny import check
import yaml
from os import listdir, mkdir
from os.path import isfile, join, isdir

print('yaml version:', yaml.__version__)

# g_ -  global variables
# gc_ -  global constants

g_yamlDir = '../yaml'
g_generatedDir = '../generated'
g_translationsDir = '/'.join((g_generatedDir, 'translations'))
g_i18nextStringsFile = '/'.join((g_generatedDir, 'i18nextStrings.ts'))

gc_Uncounted = 'uncounted'
gc_CountZero = 'zero'
gc_CountOne = 'one'
gc_CountOther = 'other'
gc_CountPluraless = 'pluraless'
gc_ArgTypeBoolean = 'boolean'
gc_ArgTypeNumber = 'number'
gc_ArgTypeString = 'string'
gc_EntryTranslations = 'translations'

g_translations = {}
g_i18nextFunctions = {}

def getFileList():
  global g_yamlDir
  onlyfiles = [f for f in listdir(g_yamlDir) if isfile(join(g_yamlDir, f))]
  return onlyfiles

def loadFile(file):
  global g_yamlDir
  with open(join(g_yamlDir, file), 'r') as f:
    o = yaml.safe_load(f)
    f.close()
    return o

def prepareDirectories():
  global g_generatedDir, g_translationsDir
  global gc_ArgTypeString, gc_ArgTypeNumber, gc_ArgTypeBoolean
  if not isdir(g_generatedDir):
    mkdir(g_generatedDir)
  if not isdir(g_translationsDir):
    mkdir(g_translationsDir)

def checkType(v, c, errorMessage):
  if isinstance(v, c):
    return True
  print(errorMessage)
  return False

def parseEntryArgs(entry):
  entryArgs = []
  try:
    entryArgsRaw = entry['args']
  except KeyError:
    entryArgsRaw = []
  if not checkType(entryArgsRaw, list, f'Parse error: entry args should be a list.\n{entry}'):
    return []
  for entryArg in entryArgsRaw:
    if not checkType(entryArg, dict, f'Parse error: each entry arg should be a dict.\n{entry}'):
      continue
    try:
      argName = entryArg['name']
    except KeyError:
      print('Parse error: "name" is missing from the entry arg.\n', entry)
      continue
    if not checkType(argName, str, f'Parse error: "name" of an arg should be a str.\n{entry}'):
      continue
    argName = argName.strip()
    try:
      argType = entryArg['type']
    except KeyError:
      print('Parse error: "type" is missing from the entry arg.\n', entry)
      continue
    if not checkType(argType, str, f'Parse error: "type" of an arg should be a str.\n{entry}'):
      continue
    argType = argType.strip()
    if not (argType == gc_ArgTypeString or argType == gc_ArgTypeNumber or argType == gc_ArgTypeBoolean):
      print(f'Parse error: "type" of an arg should be "{gc_ArgTypeString}" or "{gc_ArgTypeNumber}" or "{gc_ArgTypeBoolean}".\n', entry)
      continue
    entryArgs.append({
      'name': argName,
      'type': argType
    })
  return entryArgs

def addEntryArgs(entryKey, entryArgs, group):
  global g_i18nextFunctions
  isNewGroup = False
  try:
    groupDict = g_i18nextFunctions[group]
  except KeyError:
    isNewGroup = True
    groupDict = {}
  try:
    existedEntryArgs = groupDict[entryKey]
  except KeyError:
    groupDict[entryKey] = entryArgs
    if isNewGroup:
      g_i18nextFunctions[group] = groupDict
    return
  for newEntryArg in entryArgs:
    try:
      newEntryArgName = newEntryArg['name']
    except KeyError:
      continue
    duplicate = False
    for existedEntryArg in existedEntryArgs:
      try:
        existedEntryArgName = existedEntryArg['name']
      except KeyError:
        continue
      if groupDict[entryKey] == newEntryArgName:
        duplicate = True
        continue
    if not duplicate:
      existedEntryArgs.append(newEntryArg)
    if isNewGroup:
      g_i18nextFunctions[group] = groupDict

# arguments
#  count: '' | 'zero' | 'one' | 'other' - '' means uncounted
def parseEntryTranslations(entryTranslations, counted, count, entryArgs, entryKey, group):
  global g_translations, g_i18nextFunctions
  global gc_Uncounted, gc_CountZero, gc_CountOne, gc_CountOther, gc_CountPluraless
  #
  # g_translations = {
  #   <lang>: {
  #     <group>: {
  #       <entryKey>: {
  #         type: <'counted' | 'uncounted'>,
  #         uncounted: <value>,
  #         zero: <value>,
  #         one: <value>,
  #         other: <value>
  #       }
  #     }
  #   }
  # }
  #
  # g_i18nextFunctions = {
  #   <group>: {
  #     <entryKey>: [
  #       {
  #         name: '<arg_name>',
  #         type: '<arg_type>'
  #       },
  #       ...
  #     ]
  #   }
  # }
  #
  if not checkType(entryTranslations, dict, f'Parse error: "entryTranslations" should be a dict.\n{entryTranslations}'):
    return
  if not checkType(counted, bool, f'Parse error: "count" should be a dict.\n{counted}'):
    return
  if not checkType(count, str, f'Parse error: "count" should be a dict.\n{count}'):
    return
  if not (count == '' or count == gc_CountZero or count == gc_CountOne or count == gc_CountOther or count == gc_CountPluraless):
    print(f'Parse error: "count" should take a value from [\'\', \'{gc_CountZero}\', \'{gc_CountOne}\', \'{gc_CountOther}\', \'{gc_CountPluraless}\'].\n', count)
    return
  if not checkType(entryKey, str, f'Parse error: "entryKey" should be a str.\n{entryKey}'):
    return
  if not checkType(group, str, f'Parse error: "group" should be a str.\n{group}'):
    return
  for lang, translation in entryTranslations.items():
    if not isinstance(lang, str):
      print('Parse error: "lang" should be a dict.\n', lang)
      continue
    if not isinstance(translation, str):
      print('Parse error: "translation" should be a dict.\n', translation)
      continue
    trimmedLang = lang.strip()
    trimmedTranslation = translation.strip()
    try:
      langDict = g_translations[trimmedLang]
    except KeyError:
      langDict = {}
    try:
      groupDict = langDict[group]
    except KeyError:
      groupDict = {}
    try:
      entryKeyDict = groupDict[entryKey]
    except KeyError:
      entryKeyDict = {}
    entryKeyDict['args'] = entryArgs
    entryKeyDict['counted'] = counted
    countType = count
    if count == '':
      countType = gc_Uncounted
    else:
      countType = count
    entryKeyDict[countType] = trimmedTranslation
    groupDict[entryKey] = entryKeyDict
    langDict[group] = groupDict
    g_translations[trimmedLang] = langDict

def replaceTranslationArgs(translation, args):
  result = f'{translation}'
  for arg in args:
    argName = arg['name']
    result = result.replace('${' + argName + '}', '{{' + argName + '}}')
  return result

if __name__ == '__main__':
  prepareDirectories()
  files = getFileList()
  for f in files:
    o = loadFile(f)
    if not checkType(o, dict, f'Parse error: The root should be a dict.\n{o}'):
      continue
    try:
      group = o['group']
    except KeyError:
      print('Parse error: "group" is missing from the root.')
      continue
    if not checkType(group, str, f'Parse error: "group" should be a str.\n{group}'):
      continue
    group = group.strip()
    try:
      entries = o['entries']
    except KeyError:
      print('Parse error: "entries" is missing from the root.')
      continue
    if not checkType(entries, list, f'Parse error: "entries" should be a list.\n{entries}'):
      continue
    for entry in entries:
      if not checkType(entry, dict, f'Parse error: each entry should be a dict.\n{entry}'):
        continue
      try:
        entryKey = entry['key']
      except KeyError:
        print('Parse error: "key" is missing from the entry.\n', entry)
        continue
      if not checkType(entryKey, str, f'Parse error: "key" of an entry should be a str.\n{entry}'):
        continue
      entryKey = entryKey.strip()
      entryArgs = parseEntryArgs(entry)
      addEntryArgs(entryKey, entryArgs, group)
      try:
        counted = entry['counted']
      except KeyError:
        counted = False
      if not checkType(counted, bool, f'Parse error: "counted" of an entry should be a bool.\n{entry}'):
        continue
      if counted:
        # 'zero', 'one', 'other'
        try:
          zero = entry[gc_CountZero]
        except KeyError:
          zero = {}
        if checkType(zero, dict, f'Parse error: "zero" of an entry should be a dict.\n{entry}'):
          try:
            zeroTranslations = zero[gc_EntryTranslations]
          except KeyError:
            zeroTranslations = {}
          if checkType(zeroTranslations, dict, f'Parse error: "translations" for "zero" should be a dict.\n{entry}'):
            parseEntryTranslations(zeroTranslations, True, gc_CountZero, entryArgs, entryKey, group)
        try:
          one = entry[gc_CountOne]
        except KeyError:
          one = {}
        if checkType(one, dict, f'Parse error: "one" of an entry should be a dict.\n{entry}'):
          try:
            oneTranslations = one[gc_EntryTranslations]
          except KeyError:
            oneTranslations = {}
          if checkType(oneTranslations, dict, f'Parse error: "translations" for "one" should be a dict.\n{entry}'):
            parseEntryTranslations(oneTranslations, True, gc_CountOne, entryArgs, entryKey, group)
        try:
          other = entry[gc_CountOther]
        except KeyError:
          other = {}
        if checkType(other, dict, f'Parse error: "other" of an entry should be a dict.\n{entry}'):
          try:
            otherTranslations = other[gc_EntryTranslations]
          except KeyError:
            otherTranslations = {}
          if checkType(otherTranslations, dict, f'Parse error: "translations" for "other" should be a dict.\n{entry}'):
            parseEntryTranslations(otherTranslations, True, gc_CountOther, entryArgs, entryKey, group)
        try:
          pluraless = entry[gc_CountPluraless]
        except KeyError:
          pluraless = {}
        if checkType(pluraless, dict, f'Parse error: "pluraless" of an entry should be a dict.\n{entry}'):
          try:
            pluralessTranslations = pluraless[gc_EntryTranslations]
          except KeyError:
            pluralessTranslations = {}
          if checkType(pluralessTranslations, dict, f'Parse error: "translations" for "pluraless" should be a dict.\n{entry}'):
            parseEntryTranslations(pluralessTranslations, True, gc_CountPluraless, entryArgs, entryKey, group)
      else:
        try:
          uncountedTranslations = entry[gc_EntryTranslations]
        except KeyError:
          uncountedTranslations = {}
        if checkType(uncountedTranslations, dict, f'Parse error: "translations" for an uncounted entry should be a dict.\n{entry}'):
          parseEntryTranslations(uncountedTranslations, False, '', entryArgs, entryKey, group)
  print(f'g_translations: {g_translations}')
  print(f'g_i18nextFunctions: {g_i18nextFunctions}')

  # Now generate i18nextStrings.ts
  fout_i18next = open(g_i18nextStringsFile, 'w')
  fout_i18next.write('// Generated file. Don\'t edit.\n\n')
  fout_i18next.write('import i18next from \'i18next\';\n')
  fout_i18next.write('\n')
  fout_i18next.write('export const i18nextStrings = {\n')
  for group, groupContents in g_i18nextFunctions.items():
    fout_i18next.write(f'  {group}')
    fout_i18next.write(': {\n')
    for entry, entryArgs in groupContents.items():
      numberOfArgs = len(entryArgs)
      fout_i18next.write(f'    {entry}: (')
      for i in range(numberOfArgs):
        fout_i18next.write(f'{entryArgs[i]["name"]}: {entryArgs[i]["type"]}')
        if i + 1 < numberOfArgs:
          fout_i18next.write(', ')
      fout_i18next.write(') => {\n')
      fout_i18next.write(f'      return i18next.t(\'{group}.{entry}\'')
      if numberOfArgs > 0:
        fout_i18next.write(', {\n')
        for arg in entryArgs:
          fout_i18next.write(f'        {arg["name"]},\n')
        fout_i18next.write('      });\n')
      else:
        fout_i18next.write(');\n')
      fout_i18next.write('    },\n')
    fout_i18next.write('  },\n')
  fout_i18next.write('};\n')
  fout_i18next.close()

  # Now generate translation files
  for language, contents in g_translations.items():
    translationFile = '/'.join((g_translationsDir, f'{language}.ts'))
    fout_translationFile = open(translationFile, 'w')
    fout_translationFile.write('// Generated file. Don\'t edit.\n\n')
    fout_translationFile.write(f'export const translation_{language}')
    fout_translationFile.write(' = {\n')
    for group, entries in contents.items():
      for entry, entryDetails in entries.items():
        if entryDetails['counted']:
          try:
            zero = entryDetails['zero']
            zero = replaceTranslationArgs(zero, entryDetails['args'])
            fout_translationFile.write(f'  \'{group}.{entry}_zero\': \'{zero}\',\n')
          except KeyError:
            pass
          try:
            one = entryDetails['one']
            one = replaceTranslationArgs(one, entryDetails['args'])
            fout_translationFile.write(f'  \'{group}.{entry}_one\': \'{one}\',\n')
          except KeyError:
            pass
          try:
            other = entryDetails['other']
            other = replaceTranslationArgs(other, entryDetails['args'])
            fout_translationFile.write(f'  \'{group}.{entry}_other\': \'{other}\',\n')
          except KeyError:
            pass
          try:
            pluraless = entryDetails['pluraless']
            pluraless = replaceTranslationArgs(pluraless, entryDetails['args'])
            fout_translationFile.write(f'  \'{group}.{entry}\': \'{pluraless}\',\n')
          except KeyError:
            pass
        else:
          uncounted = replaceTranslationArgs(entryDetails['uncounted'], entryDetails['args'])
          fout_translationFile.write(f'  \'{group}.{entry}\': \'{uncounted}\',\n')
    fout_translationFile.write('};\n')
    fout_translationFile.close
